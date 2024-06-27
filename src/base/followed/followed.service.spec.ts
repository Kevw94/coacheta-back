import { Test, TestingModule } from '@nestjs/testing';
import { FollowedService } from './followed.service';
import { UsersModule } from '../users/users.module';

describe('FollowedService', () => {
	let service: FollowedService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FollowedService, UsersModule],
		}).compile();

		service = module.get<FollowedService>(FollowedService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
