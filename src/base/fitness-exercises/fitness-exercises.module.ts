import { Module } from '@nestjs/common';
import { FitnessExercisesController } from './fitness-exercises.controller';
import { FitnessExercisesService } from './fitness-exercises.service';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { FitnessExercisesRepository } from './fitness-exercises.repositoy';

@Module({
	imports: [DatabaseModule],
	controllers: [FitnessExercisesController],
	providers: [FitnessExercisesService, FitnessExercisesRepository]
})
export class FitnessExercisesModule { }
