import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "src/decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const requiredRole = this.reflector.get<string>(
      ROLE_KEY,
      context.getHandler()
    );

    if (requiredRole !== undefined && user.role.access_level !== requiredRole) {
      throw new ForbiddenException(
        "Nível de acesso insuficiente para esta rota"
      );
    }

    return true;
  }
}
