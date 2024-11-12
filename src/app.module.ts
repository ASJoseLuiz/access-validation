import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AccessLogModule } from "./access-log/access-log.module";
import { AreaModule } from "./area/area.module";
import { RouterModule } from "@nestjs/core";
import { UserConfigModule } from "./user-config/user-config.module";

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    PrismaModule,
    AccessLogModule,
    AreaModule,
    RouterModule.register([
      {
        path: "login", // pub
        module: AuthModule,
      },
      {
        path: "user", // pub
        module: UserModule,
        children: [
          {
            path: "config", // adm
            module: UserConfigModule,
          },
        ],
      },
      {
        path: "role", // adm
        module: RoleModule,
      },
      {
        path: "area", // pub/adm
        module: AreaModule,
      },
    ]),
    UserConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
