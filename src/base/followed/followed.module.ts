import { Module } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { FollowedController } from './followed.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowedRepository } from '@/base/followed/followed.repository';

@Module({
	imports: [DatabaseModule],
	providers: [FollowedService, FollowedRepository],
	controllers: [FollowedController],
})
export class FollowedModule {}
