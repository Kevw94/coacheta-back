import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsController } from './trainings.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { TrainingsService } from './trainings.service';
import { TrainingsRepository } from './trainings.repository';

describe('TrainingsController', () => {
	let controller: TrainingsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			providers: [TrainingsService, TrainingsRepository],
			controllers: [TrainingsController],
			exports: [TrainingsService],
		}).compile();

		controller = module.get<TrainingsController>(TrainingsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
