import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infrastructure/event-store/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
