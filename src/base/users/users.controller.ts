import { Jwt } from '@/common/decorators/jwt.decorator';
import {Body, Controller, Patch, Res, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ObjectId } from 'mongodb';
import { ProfileBodyDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Patch('profile')
    @UseGuards(JwtAuthGuard)
    async patchUserProfile(
        @Jwt() userId: ObjectId,
        @Body() body: ProfileBodyDTO,
        @Res() res: Response,
    ) {
        console.log('Received body:', body);

        try {
            await this.usersService.updateUserProfile(userId, body);

            return res.status(200).json({ status: 'ok' });
        } catch (error) {
            console.error('Failed to update profile:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
