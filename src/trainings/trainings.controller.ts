import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { CreateTrainingDTO, GetTrainingsByDateDTO } from './dto/trainings.dto';

@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingsController {
	constructor(private readonly trainingsService: TrainingsService) {}

	@Get('')
	async getTrainings(@Jwt() userId: ObjectId, @Res() res: Response) {
		const response = await this.trainingsService.getUsersTrainings(userId);
		return res.status(200).json({ status: 'ok', trainings: response });
	}

	@Get('trainingsByDate')
	async getTrainingsByDate(
		@Jwt() userId: ObjectId,
		@Query() query: GetTrainingsByDateDTO,
		@Res() res: Response,
	) {
		console.log('start date: ', query.startDate + typeof query.startDate);
		console.log('end date: ', query.endDate + typeof query.startDate);

		const { startDate, endDate } = query;
		const response = await this.trainingsService.getTrainingsByDate(userId, startDate, endDate);
		return res.status(200).json({ status: 'ok', trainings: response });
	}

	@Post('')
	async createTraining(
		@Jwt() userId: ObjectId,
		@Res() res: Response,
		@Body() body: CreateTrainingDTO,
	) {
		const response = await this.trainingsService.createTraining(body);
		return res.status(200).json({ status: 'ok', training: response });
	}
}
