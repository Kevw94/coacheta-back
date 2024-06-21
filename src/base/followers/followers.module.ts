import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowersRepository } from '@/base/followers/followers.repository';

@Module({
	imports: [DatabaseModule],
	providers: [FollowersService, FollowersRepository],
	controllers: [FollowersController],
})
export class FollowersModule {}
