import { Module } from "@nestjs/common";
import { AccessLogService } from "./access-log.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [AccessLogService, PrismaService],
})
export class AccessLogModule {}
