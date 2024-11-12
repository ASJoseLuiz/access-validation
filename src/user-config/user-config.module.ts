import { Module } from "@nestjs/common";
import { UserConfigController } from "./user-config.controller";
import { UserService } from "src/user/user.service";
import { HealthProfessionalFactory } from "src/abstractFactory/UserRole/HealthProfessionalFactory";
import { RoleService } from "src/role/role.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AdmProfessionalFactory } from "src/abstractFactory/UserRole/AdmProfessionalFactory";
import { SecurityProfessionalFactory } from "src/abstractFactory/UserRole/SecurityProfessionalFactory";
import { MaintenaceProfessionalFactory } from "src/abstractFactory/UserRole/MaintenaceProfessionalFactory";
import { VisitorFactory } from "src/abstractFactory/UserRole/VisitorFactory";
import { PatientFactory } from "src/abstractFactory/UserRole/PatientFactory";
import { UserFacade } from "src/facade/UserFacade.facade";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [UserConfigController],
  providers: [
    UserService,
    PrismaService,
    HealthProfessionalFactory,
    RoleService,
    AdmProfessionalFactory,
    SecurityProfessionalFactory,
    MaintenaceProfessionalFactory,
    VisitorFactory,
    PatientFactory,
    UserFacade,
    JwtService,
    ConfigService,
  ],
})
export class UserConfigModule {}
