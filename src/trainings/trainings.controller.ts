import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingsController {
	constructor(private readonly trainingsService: TrainingsService) {}

	@Get('')
	async getTrainings(@Jwt() userId: ObjectId, @Res() res: Response) {
		const response = await this.trainingsService.getUsersTrainings(userId);
		return res.status(200).json({ status: 'ok', trainings: response });
	}

	@Post('create')
	@ApiOperation({ summary: 'create a training' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async createTraining(
		@Jwt() userId: ObjectId,
		@Body() session_id: string,
		@Res() res: Response,
	) {
		await this.trainingsService.createTraining(userId, session_id);
		return res.status(201).json({ status: 'ok' });
	}

	// @Get('trainingsByDate')
	// async getTrainingsByDate(
	// 	@Jwt() userId: ObjectId,
	// 	@Query('startDate') startDate: string,
	// 	@Query('endDate') endDate: string,
	// 	@Res() res: Response,
	// ) {
	// 	const response = await this.trainingsService.getTrainingsByDate(userId, startDate, endDate);
	// 	return res.status(200).json({ status: 'ok', trainings: response });
	// }
}
