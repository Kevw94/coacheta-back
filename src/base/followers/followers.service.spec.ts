import { Test, TestingModule } from '@nestjs/testing';
import { FollowersService } from './followers.service';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { FollowersRepository } from './followers.repository';
import { FollowersController } from './followers.controller';

describe('FollowersService', () => {
	let service: FollowersService;

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

		service = module.get<FollowersService>(FollowersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
