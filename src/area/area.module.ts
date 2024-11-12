import { Module } from "@nestjs/common";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { AuthGuard } from "src/guards/authentication.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AccessLogService } from "src/access-log/access-log.service";
import { UserService } from "src/user/user.service";
import { AccessLevelStrategy } from "src/strategy/AccessLevelStrategy.strategy";
import { AccessControllFacade } from "src/facade/AccessControlFacade.facade";
import { AreaGuard } from "src/guards/area.guard";
import { AccessHierarchyStrategy } from "src/strategy/AccessHierarchyStrategy.strategy";

@Module({
  controllers: [AreaController],
  providers: [
    AreaService,
    PrismaService,
    AuthGuard,
    AreaGuard,
    JwtService,
    ConfigService,
    AccessLogService,
    UserService,
    AccessLevelStrategy,
    AccessHierarchyStrategy,
    AccessControllFacade,
  ],
})
export class AreaModule {}
