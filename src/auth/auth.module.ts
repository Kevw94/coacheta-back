import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/base/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/config/config';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { MailjetModule } from '@/external-modules/mailjet/mailjet.module';
import { AuthEventEmitter } from './events/auth.event';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailjetListeners } from '@/common/providers/mailjet.provider';
import {FollowedService} from "@/base/followed/followed.service";
import {FollowersService} from "@/base/followers/followers.service";
import {FollowedRepository} from "@/base/followed/followed.repository";
import {FollowersRepository} from "@/base/followers/followers.repository";
import { FollowersModule } from '@/base/followers/followers.module';
import { FollowedModule } from '@/base/followed/followed.module';

@Module({
	imports: [
		DatabaseModule,
		MailjetModule,
		forwardRef(() => UsersModule),
		//FIXME
		forwardRef(() => FollowersModule),
		forwardRef(() => FollowedModule),
		JwtModule.register({
			secret: config.jwt.secret,
			signOptions: { expiresIn: '30d' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthEventEmitter,
		LocalStrategy,
		JwtStrategy,
		MailjetListeners,
	],
})
export class AuthModule {}
