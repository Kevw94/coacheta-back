import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowersRepository } from '@/base/followers/followers.repository';
import {UsersRepository} from "@/base/users/users.repository";
import {UsersService} from "@/base/users/users.service";

@Module({
	imports: [DatabaseModule],
	providers: [FollowersService, FollowersRepository, UsersService, UsersRepository],
	controllers: [FollowersController],
})
export class FollowersModule {}
