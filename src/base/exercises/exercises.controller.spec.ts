import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { ExercisesService } from './exercises.service';
import { ExercisesRepository } from './exercises.repositoy';

describe('FitnessExercisesController', () => {
	let controller: ExercisesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			controllers: [ExercisesController],
			providers: [ExercisesService, ExercisesRepository],
		}).compile();

		controller = module.get<ExercisesController>(ExercisesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
