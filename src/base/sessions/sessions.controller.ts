import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SessionsService } from '@/base/sessions/sessions.service';
import { SessionsDto, UpdateSessionDto } from '@/base/sessions/dto/sessions.dto';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ObjectId } from 'mongodb';
import { Session } from './interfaces/sessions.interface';
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
	constructor(
		//@Inject(forwardRef(() => SessionsService))
		private readonly sessionsService: SessionsService,
	) {}

	@Get('')
	async getSessions(@Jwt() userId: ObjectId, @Res() res: Response) {
		const sessions = await this.sessionsService.getSessions(userId);
		return res.status(200).json({ status: 'ok', sessions: sessions });
	}

	@Get('/:id')
	async getSessionById(@Res() res: Response, @Param('id') id: string) {
		const session = await this.sessionsService.findSessionById(id);
		return res.status(200).json({ status: 'ok', session: session });
	}

	@Post('create')
	@ApiOperation({ summary: 'create a session' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async createSession(@Body() body: SessionsDto, @Res() res: Response) {
		await this.sessionsService.createNewSession(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Patch('update/:id')
	@ApiOperation({ summary: 'update a session' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async updateSession(
		@Param('id') id: string,
		@Body() body: UpdateSessionDto,
		@Jwt() userId: ObjectId,
	): Promise<Session> {
		console.log('request body: ', body);
		return this.sessionsService.findOneAndUpdateSession(id, userId, body);
	}

	@Delete('delete/:id')
	@ApiOperation({ summary: 'delete a session' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async deleteSession(@Param('id') id: string, @Jwt() userId: ObjectId) {
		return this.sessionsService.deleteOneSession(id, userId);
	}
}
