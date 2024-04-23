import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DTOActivationToken, DTOAuthEmail, DTOAuthSignin, DTOAuthSignup, DTOResetPassword } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';
import { createAuthCookie, expireAuthCookie } from './utils/auth.cookie';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signUp(@Body() body: DTOAuthSignup, @Res() res: Response) {
		await this.authService.signup(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('signin')
	async signIn(@Body() body: DTOAuthSignin, @Res() res: Response) {
		const { strategy } = await this.authService.signin(body);
		res.setHeader('Set-Cookie', createAuthCookie(strategy));
		return res.status(201).json({ status: 'ok' });
	}

	@Post('logout')
	@UseGuards(JwtAuthGuard)
	async logout(@Res() res: Response) {
		res.setHeader('Set-Cookie', expireAuthCookie());
		return res.status(201).json({ status: 'ok' });
	}

	@Post('activate')
	async activateAccount(@Res() res: Response, @Body() body: DTOActivationToken) {
		const { strategy } = await this.authService.activateAccount(body);
		res.setHeader('Set-Cookie', createAuthCookie(strategy));
		return res.status(201).json({ status: 'ok' });
	}

	@Post('ask-activation-token')
	async askActivationToken(@Res() res: Response, @Body() body: DTOAuthEmail) {
		await this.authService.askActivationToken(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('ask-reset-token')
	async askResetToken(@Res() res: Response, @Body() body: DTOAuthEmail) {
		await this.authService.askResetToken(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('reset-password')
	async resetPassword(@Res() res: Response, @Body() body: DTOResetPassword) {
		await this.authService.resetPassword(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	async getMe(@Jwt() userId: ObjectId, @Res() res: Response) {
		const currentUser = await this.authService.retrieveCurrentUser(userId);
		return res.status(200).json({ status: 'ok', user: currentUser });
	}

	@Post('token')
	@UseGuards(JwtAuthGuard)
	async isAuth(@Jwt() userId: ObjectId, @Res() res: Response) {
		await this.authService.checkAuth(userId);
		return res.status(200).json({ status: 'ok' });
	}

}
