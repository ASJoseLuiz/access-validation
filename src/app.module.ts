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
        path: "login",
        module: AuthModule,
      },
      {
        path: "user",
        module: UserModule,
        children: [
          {
            path: "config",
            module: UserConfigModule,
          },
        ],
      },
      {
        path: "role",
        module: RoleModule,
      },
      {
        path: "area",
        module: AreaModule,
      },
    ]),
    UserConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
