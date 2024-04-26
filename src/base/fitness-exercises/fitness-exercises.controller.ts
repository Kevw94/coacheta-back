import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FitnessExercisesService } from './fitness-exercises.service';
import { BodyPart } from './interfaces/fitness-exercises.interface';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FitnessExerciseEntity } from './entities/fitnessExercise.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('Fitness-exercises')
@Controller('fitness-exercises')
export class FitnessExercisesController {
	constructor(private readonly fitnessExercisesService: FitnessExercisesService) {}

	@Get('')
	@ApiOperation({ summary: 'Get All exercises from fitness table'})
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<FitnessExerciseEntity> })
	@ApiUnauthorizedResponse({ description: 'UNAUTHORIZED : You do not have the rights to access this ressource.'})
	async getAllFitnessExercises(
		@Res() res: Response,
	) {
		const response = await this.fitnessExercisesService.getAllFitnessExercises();
		return res.status(200).json({ status: 'ok', exercises: response });
	}

	@ApiOperation({ summary: 'Get exercises by category',  })
	@ApiQuery({ name: 'category', enum: BodyPart })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<FitnessExerciseEntity> })
	@ApiUnauthorizedResponse({ description: 'UNAUTHORIZED : You do not have the rights to access this ressource.'})
	@Get('category')
	async getOneexerciseByCategory(@Query('category') category: BodyPart, @Res() res: Response) {
		const response = await this.fitnessExercisesService.getExerciseByCategory(category)
		return res.status(200).json({ status: 'ok', exercises: response });
	}

	@ApiOperation({ summary: 'Get exercise by Id',  })
	@ApiParam({ name: 'exerciseId', example: "662a7557bc9013cce7dda0e5", type: String })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<FitnessExerciseEntity> })
	@ApiUnauthorizedResponse({ description: 'UNAUTHORIZED : You do not have the rights to access this ressource.'})
	@Get(':exerciseId')
	async getOneFitnessExercises(@Param('exerciseId') exerciseId: string, @Res() res: Response) {
		const response = await this.fitnessExercisesService.getOneExercise(exerciseId)
		return res.status(200).json({ status: 'ok', exercise: response });
	}

}
