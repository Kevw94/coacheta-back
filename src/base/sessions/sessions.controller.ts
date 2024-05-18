import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SessionsService } from '@/base/sessions/sessions.service';
import { SessionsDto } from '@/base/sessions/dto/sessions.dto';

@Controller('sessions')
export class SessionsController {
    constructor(
        //@Inject(forwardRef(() => SessionsService))
        private readonly sessionsService: SessionsService,
    ) {}
    @Post('create')
    @ApiOperation({ summary: 'create a session' })
    @ApiResponse({ status: 201, description: 'ok' })
    @ApiBadRequestResponse({ description: 'BAD_REQUEST' })
    async createSession(@Body() body: SessionsDto, @Res() res: Response) {
        console.log(body);
        await this.sessionsService.createNewSession(body);
        return res.status(201).json({ status: 'ok' });
    }
}
