import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
	DTOActivationToken,
	DTOAuthEmail,
	DTOAuthSignin,
	DTOAuthSignup,
	DTOResetPassword,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';
import { createAuthCookie, expireAuthCookie } from './utils/auth.cookie';
import {
	ApiBadRequestResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from '@/base/users/entities/users.entity';
import { FollowersService } from '@/base/followers/followers.service';
import { FollowedService } from '@/base/followed/followed.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly followersService: FollowersService,
		private readonly followedService: FollowedService,
	) {}

	@Post('signup')
	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async signUp(@Body() body: DTOAuthSignup, @Res() res: Response) {
		await this.authService.signup(body).then(async (insertedId) => {
			await this.followersService.initFollowers(insertedId);
			await this.followedService.initFollowed(insertedId);
		});
		return res.status(201).json({ status: 'ok' });
	}

	@Post('signin')
	@ApiOperation({ summary: 'Try signin a user' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async signIn(@Body() body: DTOAuthSignin, @Res() res: Response) {
		const { strategy } = await this.authService.signin(body);
		res.setHeader('Set-Cookie', createAuthCookie(strategy));
		return res.status(201).json({ status: 'ok' });
	}

	@Post('logout')
	@ApiOperation({ summary: 'Try log out a user' })
	@ApiResponse({ status: 201, description: 'ok' })
	@UseGuards(JwtAuthGuard)
	async logout(@Res() res: Response) {
		res.setHeader('Set-Cookie', expireAuthCookie());
		return res.status(201).json({ status: 'ok' });
	}

	@Post('activate')
	@ApiOperation({ summary: 'Try activate a user account w/ email' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async activateAccount(@Res() res: Response, @Body() body: DTOActivationToken) {
		const { strategy } = await this.authService.activateAccount(body);
		res.setHeader('Set-Cookie', createAuthCookie(strategy));
		return res.status(201).json({ status: 'ok' });
	}

	@Post('ask-activation-token')
	@ApiOperation({ summary: 'Ask for a token to get activation token by email' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async askActivationToken(@Res() res: Response, @Body() body: DTOAuthEmail) {
		await this.authService.askActivationToken(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('ask-reset-token')
	@ApiOperation({ summary: 'Ask for a new token to get activation token by email' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async askResetToken(@Res() res: Response, @Body() body: DTOAuthEmail) {
		await this.authService.askResetToken(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('reset-password')
	@ApiOperation({ summary: 'Ask for reset password user' })
	@ApiResponse({ status: 201, description: 'ok' })
	@ApiBadRequestResponse({ description: 'BAD_REQUEST' })
	async resetPassword(@Res() res: Response, @Body() body: DTOResetPassword) {
		await this.authService.resetPassword(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Get('me')
	@ApiOperation({ summary: 'Get Current User Profile' })
	@ApiResponse({
		status: 200,
		description: 'Retreive the actual user logged in',
		type: UserEntity,
	})
	@ApiUnauthorizedResponse({
		description: 'UNAUTHORIZED : You do not have the rights to access this ressource.',
	})
	@UseGuards(JwtAuthGuard)
	async getMe(@Jwt() userId: ObjectId, @Res() res: Response) {
		const currentUser = await this.authService.retrieveCurrentUser(userId);
		return res.status(200).json({ status: 'ok', user: currentUser });
	}

	@Post('token')
	@ApiOperation({ summary: 'Check the validity of the auth token' })
	@ApiResponse({ status: 201, description: 'status: ok' })
	@ApiUnauthorizedResponse({
		description: 'UNAUTHORIZED : You do not have the rights to access this ressource.',
	})
	@UseGuards(JwtAuthGuard)
	async isAuth(@Jwt() userId: ObjectId, @Res() res: Response) {
		await this.authService.checkAuth(userId);
		return res.status(200).json({ status: 'ok' });
	}
}
