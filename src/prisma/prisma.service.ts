import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super({
      log: ["error"],
    });
  }

  public async onModuleDestroy() {
    this.$disconnect();
  }

  public async onModuleInit() {
    this.$connect();
  }
}
