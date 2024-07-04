import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FollowersModule } from '../followers/followers.module';
import { FollowedModule } from '../followed/followed.module';

@Module({
	imports: [
		DatabaseModule,
		forwardRef(() => FollowersModule),
		forwardRef(() => FollowedModule),
		forwardRef(() => AuthModule),
	],
	providers: [UsersService, UsersRepository],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
