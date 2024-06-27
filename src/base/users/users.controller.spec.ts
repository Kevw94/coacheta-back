import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { forwardRef } from '@nestjs/common';
import { FollowersModule } from '../followers/followers.module';
import { FollowedModule } from '../followed/followed.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DatabaseModule,
				forwardRef(() => FollowersModule),
				forwardRef(() => FollowedModule),
				forwardRef(() => AuthModule)],
			providers: [UsersService, UsersRepository],
			controllers: [UsersController],
			exports: [UsersService],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
