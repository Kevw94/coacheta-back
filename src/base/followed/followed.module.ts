import { Module } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { FollowedController } from './followed.controller';

@Module({
  providers: [FollowedService],
  controllers: [FollowedController]
})
export class FollowedModule {}
