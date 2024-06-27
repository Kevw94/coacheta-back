import { Test, TestingModule } from '@nestjs/testing';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { FollowersRepository } from './followers.repository';
import { forwardRef } from '@nestjs/common';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { UsersModule } from '../users/users.module';

describe('FollowersController', () => {
	let controller: FollowersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DatabaseModule,
				forwardRef(() => UsersModule)
			],
			providers: [FollowersService, FollowersRepository],
			controllers: [FollowersController],
			exports: [FollowersService]
		}).compile();

		controller = module.get<FollowersController>(FollowersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
