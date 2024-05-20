import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SessionsService } from '@/base/sessions/sessions.service';
import { ObjectId } from 'mongodb';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { JwtAuthGuard } from '@/common/guards/auth.guard';

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
    async createSession(@Res() res: Response) {
        // @Body() body: SessionsDto,

        /*   await this.sessionsService.createNewSession({
            creator_id: new ObjectId('6629786312ccdffe8421f7ae'),
            name: 'Ma séance 3',
            description: 'aaaa ccccccc aaaaab',
            exercises_id: [new ObjectId("662b5612e742abc24928c38f"), new ObjectId("662b5612e742abc24928c390"), new ObjectId("662b5612e742abc24928c391"), new ObjectId("662b5612e742abc24928c393")],
            coverImageUri: 'https://picsum.photos/200/300',
        });
        */
        return res.status(201).json({ status: 'ok' });
    }

    @Get('')
    @ApiOperation({ summary: 'get my sessions' })
    @ApiResponse({ status: 201, description: 'ok' })
    @ApiBadRequestResponse({ description: 'BAD_REQUEST' })
    @UseGuards(JwtAuthGuard)
    async getMySessions(@Jwt() userId: ObjectId, @Res() res: Response) {
        const mySessions = await this.sessionsService.getMySessions(userId);
        return res.status(201).json({ status: 'ok' });
    }
}
