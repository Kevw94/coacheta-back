import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsService } from './trainings.service';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { TrainingsRepository } from './trainings.repository';
import { TrainingsController } from './trainings.controller';

describe('TrainingsService', () => {
	let service: TrainingsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			providers: [TrainingsService, TrainingsRepository],
			controllers: [TrainingsController],
			exports: [TrainingsService],
		}).compile();

		service = module.get<TrainingsService>(TrainingsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
