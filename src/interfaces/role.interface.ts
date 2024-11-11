import { Access_level, Role } from "@prisma/client";

export interface RoleServiceInterface {
  createRole(
    name: string,
    description: string,
    access_level: Access_level
  ): Promise<Role>;
  findRoleByLevel(access_level: Access_level): Promise<Role>;
  getRoles(): Promise<Role[]>;
  deleteRole(access_level: Access_level): Promise<void>;
}
