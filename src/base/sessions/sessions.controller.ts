import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SessionsService } from '@/base/sessions/sessions.service';
import {
	CreateSessionDTO,
	DeleteSessionDTO,
	GetSessionByIDDTO,
	UpdateSessionDTO,
} from '@/base/sessions/dto/sessions.dto';
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
	@ApiOperation({ summary: 'Get all sessions with userId' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async getSessions(@Jwt() userId: ObjectId, @Res() res: Response) {
		const sessions = await this.sessionsService.getSessions(userId);
		return res.status(200).json({ status: 'ok', sessions: sessions });
	}

	@Get(':sessionId')
	@ApiOperation({ summary: 'Get a session by its id' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async getSessionById(@Param('sessionId') sessionId: ObjectId, @Res() res: Response) {
		console.log('session id passed to controller: ', sessionId);
		const session = await this.sessionsService.getSessionById(sessionId);
		console.log('session in controller: ', session);
		return res.status(200).json({ status: 'ok', session: session });
	}

	@Post('')
	@ApiOperation({ summary: 'create a session' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async createSession(@Body() body: CreateSessionDTO, @Res() res: Response) {
		await this.sessionsService.createNewSession(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Patch('')
	@ApiOperation({ summary: 'update a session' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async updateSession(@Body() body: UpdateSessionDTO, @Jwt() userId: ObjectId): Promise<Session> {
		return this.sessionsService.findOneAndUpdateSession(userId, body);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'delete a session' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async deleteSession(@Param('id') sessionId: ObjectId) {
		console.log('log session id: ', sessionId + typeof sessionId);
		return this.sessionsService.deleteOneSession(sessionId);
	}
}
