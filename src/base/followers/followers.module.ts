import { forwardRef, Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowersRepository } from '@/base/followers/followers.repository';
import { UsersModule } from '../users/users.module';

// FIXME
@Module({
	imports: [DatabaseModule, forwardRef(() => UsersModule)],
	providers: [FollowersService, FollowersRepository],
	controllers: [FollowersController],
	exports: [FollowersService],
})
export class FollowersModule {}
