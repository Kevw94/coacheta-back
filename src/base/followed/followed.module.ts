import { forwardRef, Module } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { FollowedController } from './followed.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowedRepository } from '@/base/followed/followed.repository';
import { UsersService } from '@/base/users/users.service';
import { UsersRepository } from '@/base/users/users.repository';
import { UsersModule } from '../users/users.module';

// FIXME
@Module({
	imports: [
		DatabaseModule,
		forwardRef(() => UsersModule)
	],
	providers: [FollowedService, FollowedRepository],
	controllers: [FollowedController],
	exports: [FollowedService]
})
export class FollowedModule {}
