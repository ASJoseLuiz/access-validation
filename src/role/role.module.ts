import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RoleController } from "./role.controller";
import { RoleFacade } from "src/facade/RoleFacade.facade";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AccessLevelStrategy } from "src/strategy/AccessLevelStrategy.strategy";
import { UserService } from "src/user/user.service";
import { AccessLogService } from "src/access-log/access-log.service";
import { AreaService } from "src/area/area.service";
import { AccessHierarchyStrategy } from "src/strategy/AccessHierarchyStrategy.strategy";

@Module({
  providers: [
    RoleService,
    PrismaService,
    RoleFacade,
    JwtService,
    ConfigService,
    AccessLevelStrategy,
    AccessHierarchyStrategy,
    UserService,
    AccessLogService,
    AreaService,
  ],
  controllers: [RoleController],
})
export class RoleModule {}
