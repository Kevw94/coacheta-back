import { Module } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { FollowedController } from './followed.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowedRepository } from '@/base/followed/followed.repository';
import {UsersService} from "@/base/users/users.service";
import {UsersRepository} from "@/base/users/users.repository";

@Module({
	imports: [DatabaseModule],
	providers: [FollowedService, FollowedRepository, UsersService, UsersRepository],
	controllers: [FollowedController],
})
export class FollowedModule {}
