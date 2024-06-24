import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { SetsRepository } from './sets.repository';

@Module({
	imports: [DatabaseModule],
  providers: [SetsService, SetsRepository],
  controllers: [SetsController],
  exports: [SetsService],
})
export class SetsModule {}
