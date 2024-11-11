import { Injectable } from "@nestjs/common";
import { UserAbstractFactory } from "./UserAbstractFactory";
import { Role, Access_level } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { RoleService } from "src/role/role.service";
import { User } from "../Entities/User";
import { MaintenaceProfessional } from "../Entities/MaintenaceProfessional";

@Injectable()
export class MaintenaceProfessionalFactory extends UserAbstractFactory {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {
    super();
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    let role = await this.roleService.findRoleByLevel(Access_level.L3);
    if (!role) {
      role = await this.createRole(
        "Manutenção",
        "Banheiros, salas de eletricidade, salas de hidráulica, salas de sistema de gás, salas de atendimento, salas comuns"
      );
    }

    const user = await this.userService.createUser(
      name,
      email,
      password,
      role.id
    );
    return new MaintenaceProfessional(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role_id
    );
  }

  public async createRole(name: string, description: string): Promise<Role> {
    return await this.roleService.createRole(
      name,
      description,
      Access_level.L3
    );
  }
}
