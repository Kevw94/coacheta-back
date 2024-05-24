import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { Response } from 'express';
import { ObjectId } from 'mongodb';

@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingsController {
	constructor(private readonly trainingsService: TrainingsService) {}

	@Get('trainings')
	async getTrainings(@Jwt() userId: ObjectId, @Res() res: Response) {
		const response = await this.trainingsService.getUsersTrainings(userId);
		return res.status(200).json({ status: 'ok', trainings: response });
	}

	@Get('trainingsByDate')
	async getTrainingsByDate(
		@Jwt() userId: ObjectId,
		@Query('startDate') startDate: string,
		@Query('endDate') endDate: string,
		@Res() res: Response,
	) {
		const response = await this.trainingsService.getTrainingsByDate(userId, startDate, endDate);
		return res.status(200).json({ status: 'ok', trainings: response });
	}
}
