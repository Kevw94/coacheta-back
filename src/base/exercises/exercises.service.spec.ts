import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { ExercisesController } from './exercises.controller';
import { ExercisesRepository } from './exercises.repositoy';

describe('FitnessExercisesService', () => {
	let service: ExercisesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			controllers: [ExercisesController],
			providers: [ExercisesService, ExercisesRepository],
		}).compile();

		service = module.get<ExercisesService>(ExercisesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
