import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Access_level, Role } from "@prisma/client";
import { RoleServiceInterface } from "../interfaces/role.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoleService implements RoleServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async createRole(
    name: string,
    description: string,
    access_level: Access_level
  ): Promise<Role> {
    try {
      const role = await this.findRoleByLevel(access_level);

      if (role) {
        throw new ConflictException(`O papel ${access_level} já existe`);
      }

      return await this.prismaService.role.create({
        data: { name, description, access_level },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao criar papel",
        error: err,
      });
    }
  }

  public async findRoleByLevel(access_level: Access_level): Promise<Role> {
    try {
      return await this.prismaService.role.findUnique({
        where: { access_level },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao encontrar papel pelo nível",
        error: err,
      });
    }
  }

  public async getRoles(): Promise<Role[]> {
    try {
      return await this.prismaService.role.findMany({
        orderBy: { access_level: "asc" },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao retornar os papéis",
        error: err,
      });
    }
  }

  public async deleteRole(access_level: Access_level): Promise<void> {
    try {
      const role = await this.findRoleByLevel(access_level);
      if (!role) {
        throw new NotFoundException("Este papel não existe");
      }
      await this.prismaService.role.delete({ where: { access_level } });
    } catch (err) {}
  }
}
