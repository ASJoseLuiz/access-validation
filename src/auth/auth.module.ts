import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvSchema } from "../types/env-zod";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "src/guards/authentication.guard";
import { AccessLogService } from "src/access-log/access-log.service";
@Module({
  providers: [
    AuthService,
    JwtService,
    PrismaService,
    ConfigService,
    AuthGuard,
    AccessLogService,
  ],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvSchema, true>) => {
        return {
          secret: configService.get<string>("JWT_PRIVATE_KEY"),
          signOptions: { expiresIn: "60m" },
        };
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
