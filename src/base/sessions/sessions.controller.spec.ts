import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { SessionsService } from './sessions.service';
import { SessionsRepository } from './sessions.repository';

describe('SessionsController', () => {
	let controller: SessionsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			providers: [SessionsService, SessionsRepository],
			controllers: [SessionsController],
			exports: [SessionsService],
		}).compile();

		controller = module.get<SessionsController>(SessionsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
