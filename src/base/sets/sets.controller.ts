import { Jwt } from '@/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateSetDTO, UpdateSetDTO } from './dto/sets.dto';
import { Response } from 'express';
import { SetsService } from './sets.service';

@Controller('sets')
@UseGuards(JwtAuthGuard)
export class SetsController {
	constructor(private readonly setsService: SetsService) {}

	@Post('')
	async createSet(@Jwt() userId: ObjectId, @Body() body: CreateSetDTO, @Res() res: Response) {
		const response = await this.setsService.createSet(body);
		return res
			.status(201)
			.json({ status: 'ok', set: response.set, training: response.training });
	}

	@Delete(':id')
	async deleteSet(@Param('id') id: ObjectId, @Res() res: Response) {
		await this.setsService.deleteSet(id);
		return res.status(201).json({ status: 'ok' });
	}

	@Patch('')
	async patchSets(@Jwt() userId: ObjectId, @Body() body: UpdateSetDTO, @Res() res: Response) {
		console.log('set to patch in controller: ', body);
		const response = await this.setsService.patchSet(body);
		return res.status(201).json({ status: 'ok', setUpdate: response });
	}

	@Get('setByTrainingId/:trainingId')
	async getSetByTrainingId(
		@Jwt() userId: ObjectId,
		@Param('trainingId') trainingId: ObjectId,
		@Res() res: Response,
	) {
		const response = await this.setsService.getSetByTrainingId(userId, trainingId);
		return res.status(201).json({ status: 'ok', sets: response });
	}
}
