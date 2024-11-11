import { Injectable } from "@nestjs/common";
import { Access_level, Area } from "@prisma/client";
import { AccessLogService } from "src/access-log/access-log.service";
import { AreaService } from "src/area/area.service";

@Injectable()
export class AccessControllFacade {
  constructor(
    private readonly accessLogService: AccessLogService,
    private readonly areaService: AreaService
  ) {}

  public async getHospitalAreas(): Promise<Area[]> {
    return await this.areaService.getHospitalAreas();
  }

  public async createHospitalArea(
    name: string,
    description: string,
    required_access_level: Access_level
  ): Promise<void> {
    await this.areaService.createHospitalArea(
      name,
      description,
      required_access_level
    );
  }

  public async getAccessLogView(user_id: string, area_id: string) {
    return this.accessLogService.getAccessLogView(user_id, area_id);
  }
}
