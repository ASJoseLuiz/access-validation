import { Injectable } from "@nestjs/common";
import { Access_level, Role } from "@prisma/client";
import { RoleService } from "src/role/role.service";

@Injectable()
export class RoleFacade {
  constructor(private readonly roleService: RoleService) {}

  public async getRoles(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }

  public async createRole(
    name: string,
    description: string,
    access_level: Access_level
  ): Promise<Role> {
    return await this.roleService.createRole(name, description, access_level);
  }

  public async deleteRole(access_level: Access_level): Promise<void> {
    await this.roleService.deleteRole(access_level);
  }
}
