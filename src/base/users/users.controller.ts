import { Jwt } from '@/common/decorators/jwt.decorator';
import {Body, Controller, Get, Param, Patch, Res, UseGuards} from '@nestjs/common';
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

	@Get(':id')
	async getUserById(@Param('id') id: string, @Res() res: Response) {
		const user = await this.usersService.getUserById( id );
		return res.status(200).json({ status: 'ok', user: user });

	}
}