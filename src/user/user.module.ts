import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserController } from "./user.controller";
import { HealthProfessionalFactory } from "src/abstractFactory/factory/HealthProfessionalFactory";
import { RoleService } from "src/role/role.service";
import { AdmProfessionalFactory } from "src/abstractFactory/factory/AdmProfessionalFactory";
import { SecurityProfessionalFactory } from "src/abstractFactory/factory/SecurityProfessionalFactory";
import { MaintenaceProfessionalFactory } from "src/abstractFactory/factory/MaintenaceProfessionalFactory";
import { VisitorFactory } from "src/abstractFactory/factory/VisitorFactory";
import { PatientFactory } from "src/abstractFactory/factory/PatientFactory";
import { UserFacade } from "src/facade/UserFacade.facade";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
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
  controllers: [UserController],
})
export class UserModule {}
