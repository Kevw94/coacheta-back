import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ExercicesService } from './exercices.service';
import { Response } from 'express';
import { BodyPart } from './interfaces/exercices.interface';
import { ExerciceEntity } from './entities/exercice.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('Fitness-exercises')
@Controller('exercises')
export class ExercicesController {
	constructor(private readonly exercicesService: ExercicesService) {}

	@Get('')
	@ApiOperation({ summary: 'Get All exercises from fitness table'})
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<ExerciceEntity> })
	@ApiUnauthorizedResponse({ description: 'UNAUTHORIZED : You do not have the rights to access this ressource.'})
	async getAllFitnessExercises(
		@Res() res: Response,
	) {
		const response = await this.exercicesService.getAllFitnessExercises();
		return res.status(200).json({ status: 'ok', exercises: response });
	}

	@ApiOperation({ summary: 'Get exercises by category',  })
	@ApiQuery({ name: 'category', enum: BodyPart })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<ExerciceEntity> })
	@ApiUnauthorizedResponse({ description: 'UNAUTHORIZED : You do not have the rights to access this ressource.'})
	@Get('category')
	async getOneexerciseByCategory(@Query('category') category: BodyPart, @Res() res: Response) {
		const response = await this.exercicesService.getExerciseByCategory(category)
		return res.status(200).json({ status: 'ok', exercises: response });
	}

	@ApiOperation({ summary: 'Get exercise by Id',  })
	@ApiParam({ name: 'exerciseId', example: "662a7557bc9013cce7dda0e5", type: String })
	@ApiResponse({ status: 200, description: 'status: ok', type: Array<ExerciceEntity> })
	@ApiUnauthorizedResponse({ description: 'UNAUTHORIZED : You do not have the rights to access this ressource.'})
	@Get(':exerciseId')
	async getOneFitnessExercises(@Param('exerciseId') exerciseId: string, @Res() res: Response) {
		const response = await this.exercicesService.getOneExercise(exerciseId)
		return res.status(200).json({ status: 'ok', exercise: response });
	}

}