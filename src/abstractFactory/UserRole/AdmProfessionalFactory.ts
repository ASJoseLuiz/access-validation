import { Injectable } from "@nestjs/common";
import { UserAbstractFactory } from "./UserAbstractFactory";
import { Role, Access_level } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { RoleService } from "src/role/role.service";
import { User } from "../Entities/User";
import { AdmProfessional } from "../Entities/AdmProfessional";

@Injectable()
export class AdmProfessionalFactory extends UserAbstractFactory {
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
    let role = await this.roleService.findRoleByLevel(Access_level.L5);
    if (!role) {
      role = await this.createRole(
        "Profissional administrativo do hospital",
        "Salas da gerência, áreas restritas de dados do hospital, salas do financeiro, salas de arquivos e salas do RH"
      );
    }

    const user = await this.userService.createUser(
      name,
      email,
      password,
      role.id
    );
    return new AdmProfessional(
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
      Access_level.L5
    );
  }
}
