import { forwardRef, Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { TrainingsRepository } from './trainings.repository';

@Module({
	imports: [DatabaseModule],
	providers: [TrainingsService, TrainingsRepository],
	controllers: [TrainingsController],
	exports: [TrainingsService]
})
export class TrainingsModule {}
