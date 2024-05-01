import {Body, Controller, forwardRef, Inject, Post, Res} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DTOAuthSignin} from "@/auth/dto/auth.dto";
import {Response} from "express";
import {createAuthCookie} from "@/auth/utils/auth.cookie";
import {SessionsRepository} from "@/base/sessions/sessions.repository";
import {SessionsService} from "@/base/sessions/sessions.service";

@Controller('sessions')
export class SessionsController {
    constructor(
        @Inject(forwardRef(() => SessionsService))
        private sessionsService: SessionsService,
    ) {}
    @Post('')
    @ApiOperation({ summary: 'create a session' })
    @ApiResponse({ status: 201, description: 'ok' })
    @ApiBadRequestResponse({ description: 'BAD_REQUEST'})
    async createSession(@Body() body: DTOAuthSignin, @Res() res: Response) {
        const { strategy } = await this.sessionsService.createNewSession(body);
        res.setHeader('Set-Cookie', createAuthCookie(strategy));
        return res.status(201).json({ status: 'ok' });
    }
}
