import { Test, TestingModule } from '@nestjs/testing';
import { FitnessExercisesService } from './fitness-exercises.service';

describe('FitnessExercisesService', () => {
  let service: FitnessExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitnessExercisesService],
    }).compile();

    service = module.get<FitnessExercisesService>(FitnessExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
