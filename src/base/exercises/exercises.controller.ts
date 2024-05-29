import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ExercisesService } from './exercises.service';
import { BodyPart } from './interfaces/exercises.interface';
import {
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExerciseEntity } from './entities/Exercise.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
	constructor(private readonly exercisesService: ExercisesService) {}

	@Get('')
	@ApiOperation({ summary: 'Get All exercises from fitness table' })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<ExerciseEntity> })
	@ApiUnauthorizedResponse({
		description: 'UNAUTHORIZED : You do not have the rights to access this ressource.',
	})
	async getAllFitnessExercises(@Res() res: Response) {
		const response = await this.exercisesService.getAllExercises();
		return res.status(200).json({ status: 'ok', exercises: response });
	}

	@ApiOperation({ summary: 'Get exercises by category' })
	@ApiQuery({ name: 'category', enum: BodyPart })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<ExerciseEntity> })
	@ApiUnauthorizedResponse({
		description: 'UNAUTHORIZED : You do not have the rights to access this ressource.',
	})
	@Get('category')
	async getOneexerciseByCategory(@Query('category') category: BodyPart, @Res() res: Response) {
		console.log('*******request***********');
		const response = await this.exercisesService.getExerciseByCategory(category);
		return res.status(200).json({ status: 'ok', exercises: response });
	}

	@ApiOperation({ summary: 'Get exercise by Id' })
	@ApiParam({ name: 'exerciseId', example: '662a7557bc9013cce7dda0e5', type: String })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<ExerciseEntity> })
	@ApiUnauthorizedResponse({
		description: 'UNAUTHORIZED : You do not have the rights to access this ressource.',
	})
	@Get(':exerciseId')
	async getOneFitnessExercises(@Param('exerciseId') exerciseId: string, @Res() res: Response) {
		const response = await this.exercisesService.getOneExercise(exerciseId);
		return res.status(200).json({ status: 'ok', exercise: response });
	}
}
