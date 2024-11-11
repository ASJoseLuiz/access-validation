import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Access_level, Area } from "@prisma/client";
import { AreaServiceInterface } from "../interfaces/area.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AreaService implements AreaServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async deleteAreaById(id: string): Promise<void> {
    try {
      const area = await this.getHospitalAreaById(id);
      if (!area) {
        throw new NotFoundException("Área não encontrada");
      }

      await this.prismaService.area.delete({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException("Erro ao tentar deletar a área");
    }
  }

  public async getHospitalAreas(): Promise<Area[]> {
    try {
      return await this.prismaService.area.findMany();
    } catch (err) {
      throw new InternalServerErrorException("Erro ao retornar as áreas");
    }
  }

  public async createHospitalArea(
    name: string,
    description: string,
    required_access_level: Access_level
  ): Promise<void> {
    try {
      await this.prismaService.area.create({
        data: { name, description, required_access_level },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Não foi possível criar área",
        error: err,
      });
    }
  }

  public async getHospitalAreaById(id: string): Promise<Area> {
    try {
      const area = await this.prismaService.area.findUnique({ where: { id } });
      if (!area) {
        throw new NotFoundException("Área não encontrada");
      }

      return area;
    } catch (err) {
      throw new InternalServerErrorException("Erro ao buscar área pelo ID");
    }
  }

  public async getAccessLevelByAreaId(id: string): Promise<Access_level> {
    try {
      const area = await this.getHospitalAreaById(id);
      return area.required_access_level;
    } catch (err) {
      throw new InternalServerErrorException(
        "Erro em retornar o nível de acesso exigido"
      );
    }
  }
}
