import { Jwt } from '@/common/decorators/jwt.decorator';
import { Body, Controller, Patch, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ObjectId } from 'mongodb';

import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProfileDTO } from './dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Patch('profile')
	@UseGuards(JwtAuthGuard)
	async patchUserProfile(
		@Jwt() userId: ObjectId,
		@Body() body: UpdateProfileDTO,
		@Res() res: Response,
	) {
		await this.usersService.updateUserProfile(userId, body);
		return res.status(200).json({ status: 'ok' });
	}
}
