import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Access_status, AccessLog } from "@prisma/client";
import { AccessLogInterface } from "../interfaces/accessLog.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccessLogService implements AccessLogInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async createAccessLog(
    user_id: string | undefined,
    area_id: string | undefined,
    access_status: Access_status
  ): Promise<void> {
    try {
      const acceessLog = await this.prismaService.accessLog.findFirst({
        where: { user_id, area_id },
      });

      if (acceessLog) {
        throw new ConflictException("Log de Acesso já registrado");
      }

      await this.prismaService.accessLog.create({
        data: {
          user_id: user_id ?? "Unknown",
          area_id: area_id ?? "Unknown",
          access_time: new Date(),
          access_status,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException({
        message: "Erro ao tentar criar o log de acesso",
        error: err,
      });
    }
  }

  public async getAccessLogView(user_id: string, area_id): Promise<AccessLog> {
    return await this.prismaService.accessLog.findFirst({
      where: { user_id, area_id },
    });
  }

  public async updateAccessStatus(
    user_id: string,
    area_id: string,
    status: Access_status
  ): Promise<void> {
    await this.prismaService.accessLog.update({
      where: { user_id_area_id: { user_id, area_id } },
      data: { access_status: status },
    });
  }

  public async getOrCreateAccessLog(
    user_id: string,
    area_id: string
  ): Promise<AccessLog> {
    let accessLog = await this.getAccessLogView(user_id, area_id);

    if (!accessLog) {
      await this.createAccessLog(user_id, area_id, Access_status.IN_PROCESS);
      accessLog = await this.getAccessLogView(user_id, area_id);
    }

    return accessLog;
  }

  public async denyAccess(user_id: string, area_id: string): Promise<void> {
    await this.updateAccessStatus(user_id, area_id, Access_status.DENIED);
  }

  public async authorizeAccess(
    user_id: string,
    area_id: string
  ): Promise<void> {
    await this.updateAccessStatus(user_id, area_id, Access_status.AUTHORIZED);
  }
}
