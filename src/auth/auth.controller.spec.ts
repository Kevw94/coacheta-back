import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/base/users/users.module';
import { FollowedModule } from '@/base/followed/followed.module';
import { FollowersModule } from '@/base/followers/followers.module';
import { AuthService } from './auth.service';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UsersModule, FollowedModule, FollowersModule],
			controllers: [AuthController],
			providers: [AuthService]
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
