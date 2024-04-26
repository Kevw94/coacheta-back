import { Test, TestingModule } from '@nestjs/testing';
import { FitnessExercisesController } from './fitness-exercises.controller';

describe('FitnessExercisesController', () => {
  let controller: FitnessExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitnessExercisesController],
    }).compile();

    controller = module.get<FitnessExercisesController>(FitnessExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
