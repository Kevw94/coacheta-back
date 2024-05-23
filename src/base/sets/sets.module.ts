import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';

@Module({
  providers: [SetsService],
  controllers: [SetsController]
})
export class SetsModule {}
