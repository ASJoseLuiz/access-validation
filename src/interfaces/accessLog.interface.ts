import { Access_status, AccessLog } from "@prisma/client";

export interface AccessLogInterface {
  createAccessLog(
    user_id: string,
    area_id: string,
    access_status: Access_status
  ): Promise<void>;
  getAccessLogView(user_id: string, area_id: string): Promise<AccessLog>;
  updateAccessStatus(
    user_id: string,
    area_id: string,
    status: Access_status
  ): Promise<void>;
  getOrCreateAccessLog(user_id: string, area_id: string): Promise<AccessLog>;
  denyAccess(user_id: string, area_id: string): Promise<void>;
  authorizeAccess(user_id: string, area_id: string): Promise<void>;
}
