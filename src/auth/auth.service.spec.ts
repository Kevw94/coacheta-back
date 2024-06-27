import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '@/base/users/users.module';
import { FollowedModule } from '@/base/followed/followed.module';
import { FollowersModule } from '@/base/followers/followers.module';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { MailjetModule } from '@/external-modules/mailjet/mailjet.module';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/config/config';
import { AuthController } from './auth.controller';
import { AuthEventEmitter } from './events/auth.event';
import { LocalStrategy } from './strategy/local.strategy';
import { MailjetListeners } from '@/common/providers/mailjet.provider';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
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
				{
					provide: 'EventEmitter',
					useClass: EventEmitter2,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
