import { Module } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarsController } from './calendars.controller';

@Module({
	providers: [CalendarsService],
	controllers: [CalendarsController],
})
export class CalendarsModule {}
