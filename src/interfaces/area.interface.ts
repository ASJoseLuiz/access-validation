import { Access_level, Area } from "@prisma/client";

export interface AreaServiceInterface {
  createHospitalArea(
    name: string,
    description: string,
    required_access_level: Access_level
  ): Promise<void>;
  getHospitalAreaById(id: string): Promise<Area>;
  getAccessLevelByAreaId(id: string): Promise<Access_level>;
  deleteAreaById(id: string): Promise<void>;
}
