import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { ExercicesRepository } from './exercices.repository';

@Module({
	imports: [DatabaseModule],
	providers: [ExercicesService, ExercicesRepository],
	controllers: [ExercicesController]
})
export class ExercicesModule {}
