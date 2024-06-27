import { Test, TestingModule } from '@nestjs/testing';
import { SetsService } from './sets.service';
import { TrainingsModule } from '@/trainings/trainings.module';

describe('SetsService', () => {
	let service: SetsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SetsService, TrainingsModule],
		}).compile();

		service = module.get<SetsService>(SetsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
