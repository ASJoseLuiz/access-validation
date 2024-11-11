import { Module } from '@nestjs/common';
import { AccessLogService } from './access-log.service';

@Module({
  providers: [AccessLogService]
})
export class AccessLogModule {}
