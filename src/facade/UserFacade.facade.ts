import { Injectable, BadRequestException } from "@nestjs/common";
import { HealthProfessionalFactory } from "src/abstractFactory/UserRole/HealthProfessionalFactory";
import { AdmProfessionalFactory } from "src/abstractFactory/UserRole/AdmProfessionalFactory";
import { MaintenaceProfessionalFactory } from "src/abstractFactory/UserRole/MaintenaceProfessionalFactory";
import { PatientFactory } from "src/abstractFactory/UserRole/PatientFactory";
import { SecurityProfessionalFactory } from "src/abstractFactory/UserRole/SecurityProfessionalFactory";
import { VisitorFactory } from "src/abstractFactory/UserRole/VisitorFactory";
import { User } from "src/abstractFactory/Entities/User";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly healthProfessionalFactory: HealthProfessionalFactory,
    private readonly admProfessionalFactory: AdmProfessionalFactory,
    private readonly maintenanceProfessionalFactory: MaintenaceProfessionalFactory,
    private readonly patientFactory: PatientFactory,
    private readonly securityFactory: SecurityProfessionalFactory,
    private readonly visitorFactory: VisitorFactory
  ) {}

  public async createUser(
    name: string,
    email: string,
    password: string,
    userType: string
  ): Promise<User> {
    switch (userType) {
      case "health":
        return this.healthProfessionalFactory.createUser(name, email, password);

      case "adm":
        return this.admProfessionalFactory.createUser(name, email, password);

      case "maintenace":
        return this.maintenanceProfessionalFactory.createUser(
          name,
          email,
          password
        );

      case "security":
        return this.securityFactory.createUser(name, email, password);

      case "patient":
        return this.patientFactory.createUser(name, email, password);

      case "visitor":
        return this.visitorFactory.createUser(name, email, password);

      default:
        throw new BadRequestException("Tipo de usuário inválido");
    }
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userService.getUsers();
    const newUsers = users.map(
      (user) =>
        new User(user.id, user.name, user.email, user.password, user.role_id)
    );
    return newUsers;
  }

  public async deleteUser(email: string, password: string): Promise<User> {
    const user = await this.userService.deleteUserByEmail(email, password);
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role_id
    );
  }
}
