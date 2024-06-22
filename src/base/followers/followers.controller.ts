import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';
import { FollowersService } from '@/base/followers/followers.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Followers')
@Controller('followers')
export class FollowersController {
	constructor(private readonly followersService: FollowersService) {}

	@Get('')
	async getFollowers(@Jwt() userId: ObjectId, @Res() res: Response) {
		const followers = await this.followersService.getFollowers(userId);
		return res.status(200).json({ status: 'ok', followers: followers });
	}

	@Post('')
	async addPersonFollowed(@Jwt() userId: ObjectId, @Body() body: any) {
		await this.followersService.addFollower(userId, body.friendname);
	}
}
