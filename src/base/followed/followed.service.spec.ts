import { Test, TestingModule } from '@nestjs/testing';
import { FollowedService } from './followed.service';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { forwardRef } from '@nestjs/common';
import { FollowedRepository } from './followed.repository';
import { FollowedController } from './followed.controller';

describe('FollowedService', () => {
	let service: FollowedService;

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

		service = module.get<FollowedService>(FollowedService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
