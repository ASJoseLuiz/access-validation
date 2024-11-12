import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccessLevelStrategy } from "src/strategy/AccessLevelStrategy.strategy";
import { AccessHierarchyStrategy } from "../strategy/AccessHierarchyStrategy.strategy";
import { STRATEGY_KEY } from "src/decorators/access-strategy.decorator";
import { Strategy } from "src/strategy/strategy";

@Injectable()
export class AreaGuard implements CanActivate {
  constructor(
    private readonly accessLevelStrategy: AccessLevelStrategy,
    private readonly accessHierarchyStrategy: AccessHierarchyStrategy,
    private readonly reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const area_id = request.params.area_id;

    if (!area_id) {
      throw new ForbiddenException("Área não especificada");
    }

    const strategyType = this.reflector.get<string>(
      STRATEGY_KEY,
      context.getHandler()
    );

    return await this.checkAccess(area_id, user.sub, user.email, strategyType);
  }

  private async checkAccess(
    area_id: string,
    user_id: string,
    user_email: string,
    strategyType: string
  ): Promise<boolean> {
    const strategy: Strategy =
      strategyType === "hierarchy"
        ? this.accessHierarchyStrategy
        : this.accessLevelStrategy;

    return await strategy.verifyAccess(area_id, user_id, user_email);
  }
}
