import { Test, TestingModule } from '@nestjs/testing';
import { FollowedController } from './followed.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FollowedService } from './followed.service';
import { FollowedRepository } from './followed.repository';

describe('FollowedController', () => {
	let controller: FollowedController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DatabaseModule,
				forwardRef(() => UsersModule)
			],
			providers: [FollowedService, FollowedRepository],
			controllers: [FollowedController],
			exports: [FollowedService]
		}).compile();

		controller = module.get<FollowedController>(FollowedController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
