import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { ExercisesRepository } from './exercises.repositoy';

@Module({
	imports: [DatabaseModule],
	controllers: [ExercisesController],
	providers: [ExercisesService, ExercisesRepository]
})
export class ExercisesModule { }
