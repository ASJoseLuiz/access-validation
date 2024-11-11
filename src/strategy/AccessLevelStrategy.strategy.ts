import { UserService } from "src/user/user.service";
import { Strategy } from "./Strategy";
import { AreaService } from "src/area/area.service";
import { AccessLogService } from "src/access-log/access-log.service";
import { ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AccessLevelStrategy implements Strategy {
    constructor(
        private readonly userService: UserService,
        private readonly accessLogService: AccessLogService,
        private readonly areaService: AreaService
    ) { }

    public async verifyAccess(
        area_id: string,
        user_id: string,
        user_email: string
    ): Promise<boolean> {
        const userAccessLevel =
            await this.userService.getUserAccessLevelByEmail(user_email);
        const areaAccessLevel =
            await this.areaService.getAccessLevelByAreaId(area_id);

        await this.accessLogService.getOrCreateAccessLog(user_id, area_id);

        if (userAccessLevel !== areaAccessLevel) {
            await this.accessLogService.denyAccess(user_id, area_id);
            throw new ForbiddenException("Acesso negado");
        }

        await this.accessLogService.authorizeAccess(user_id, area_id);
        return true;
    }
}
