import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SessionsService } from '@/base/sessions/sessions.service';
import { SessionsDto } from '@/base/sessions/dto/sessions.dto';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ObjectId } from 'mongodb';
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
		console.log(sessions);

        return res.status(200).json({ status: 'ok' , sessions: sessions});
    }

    @Post('create')
    @ApiOperation({ summary: 'create a session' })
    @ApiResponse({ status: 201, description: 'ok' })
    @ApiBadRequestResponse({ description: 'BAD_REQUEST' })
    async createSession(@Body() body: SessionsDto, @Res() res: Response) {
        await this.sessionsService.createNewSession(body);
        return res.status(201).json({ status: 'ok' });
    }
}
