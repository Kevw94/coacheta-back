import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FollowedService } from '@/base/followed/followed.service';
import { Response } from 'express';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';

@UseGuards(JwtAuthGuard)
@ApiTags('Followed')
@Controller('followed')
export class FollowedController {
	constructor(private readonly followedService: FollowedService) {}

	@Get('')
	async getAllPeopleFollowed(@Jwt() userId: ObjectId, @Res() res: Response) {
		const followed = await this.followedService.getPeopleIfollowed(userId);
		return res.status(200).json({ status: 'ok', followed: followed });
	}

	@Post('')
	async addPersonFollowed(@Jwt() userId: ObjectId, @Body() body: any)
	{
		await this.followedService.addFollowed(userId, body.friendname);

	}

	// TODO create add friends if exist update tableau if not create, then do test, then display it in front,
}
