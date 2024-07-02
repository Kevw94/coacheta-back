import { Body, Controller, Get, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { GetTrainingsByDateDTO, UpdateTrainingDTO, CreateTrainingDTO } from './dto/trainings.dto';

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
		const { startDate, endDate } = query;
		const response = await this.trainingsService.getTrainingsByDate(userId, startDate, endDate);
		return res.status(200).json({ status: 'ok', trainings: response });
	}

	@Patch('')
	async updateTraining(@Body() body: UpdateTrainingDTO, @Res() res: Response) {
		const response = await this.trainingsService.updateTraining(body);
		return res.status(200).json({ status: 'ok', training: response });
	}

	@Post('')
	async createTraining(@Res() res: Response, @Body() body: CreateTrainingDTO) {
		const response = await this.trainingsService.createTraining(body);
		return res.status(200).json({ status: 'ok', training: response });
	}
}
