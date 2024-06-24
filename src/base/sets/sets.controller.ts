import { Jwt } from '@/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Body, Controller, Delete, Post, Res, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { SetsDeleteDto } from './dto/sets.dto';
import { Response } from 'express';
import { SetsService } from './sets.service';
import { Set } from './interfaces/sets.interface';

@Controller('sets')
@UseGuards(JwtAuthGuard)
export class SetsController {
	constructor(private readonly setsService: SetsService) {}

	@Post("")
	async createSet(@Jwt() userId: ObjectId, @Body() body: Set, @Res() res: Response ) {
		const response = await this.setsService.createSets(body);
		return res.status(201).json({status: "ok", set: response})
	}


	@Delete('')
	async deleteSet(
		@Jwt() userId: ObjectId,
		@Body() body: SetsDeleteDto,
		@Res() res: Response,
	) {
		await this.setsService.deleteSet(body._id);
		return res.status(200).json({ status: 'ok' });
	}
}
