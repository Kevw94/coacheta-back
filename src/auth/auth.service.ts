import { ServiceError } from '@/common/decorators/catch.decorator';
import { UsersService } from '@/base/users/users.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEventEmitter } from './events/auth.event';
import {
	DTOActivationToken,
	DTOAuthEmail,
	DTOAuthSignin,
	DTOAuthSignup,
	DTOResetPassword,
	DTOResetToken,
} from './dto/auth.dto';
import { credentialsPassword } from './utils/auth.security';
import { User } from '@/base/users/interfaces/users.interface';
import {
	generateCodeToken,
	generateRandomToken,
	verifyPassword,
} from '@/common/helpers/string.helper';
import { ObjectId, UpdateFilter } from 'mongodb';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService,
		private authEventEmitter: AuthEventEmitter,
		private jwtTokenService: JwtService,
	) {}

	async signup(payload: DTOAuthSignup) {
		const userExists = await this.usersService.isUserExists(payload.email);
		if (userExists) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const { email, password, username } = payload;

		const hashedPassword = await credentialsPassword(password);

		const newUser: User = {
			profile: {
				username,
				email,
			},
			hashedPassword: hashedPassword,
			is_active: false,
			created_at: new Date(),
			activation_token: generateCodeToken(),
		};
		let tryCreateUser = null;
		try {
			 tryCreateUser = await this.usersService.tryRegisterUser(newUser);
			if (!tryCreateUser.acknowledged) throw new ServiceError('BAD_REQUEST', 'Error 400');
		} catch (err) {
			throw new ServiceError('BAD_REQUEST', 'Error 400');
		}

		this.authEventEmitter.askActivationToken(email, newUser.activation_token);
		return tryCreateUser.insertedId;
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneUser({ 'profile.email': email });
		if (user === null) return null;

		const isGoodPassword = await verifyPassword(user.hashedPassword, password);

		if (user && isGoodPassword) {
			const { hashedPassword, ...result } = user;
			return result;
		}
		return null;
	}

	async signin(payload: DTOAuthSignin) {
		const { email, password } = payload;
		const userExists = await this.usersService.findOneUser({ 'profile.email': email });
		if (userExists === null) throw new ServiceError('BAD_REQUEST', 'Error 400');

		if (!userExists.is_active) throw new ServiceError('BAD_REQUEST', 'Error 400');

		if (userExists === null) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const passwordMatch = await verifyPassword(userExists.hashedPassword, password);
		if (!passwordMatch) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const strategy = await this.getTokenStrategy(userExists._id);

		return { strategy };
	}

	async getTokenStrategy(userId: ObjectId) {
		if (userId === null || userId === undefined) return null;

		const token = await this.generateToken({ id: userId.toString() });
		return JSON.stringify({ token: token });
	}

	async generateToken(payload: Record<string, unknown>) {
		return this.jwtTokenService.signAsync(payload);
	}

	async activateAccount(payload: DTOActivationToken) {
		const { activationToken } = payload;
		const query = { activation_token: activationToken };
		const update: UpdateFilter<User> = {
			$unset: { activation_token: 1 },
			$set: { is_active: true },
		};
		const data = await this.usersService.findOneAndUpdateUser(query, update);

		if (data === null) throw new ServiceError('BAD_REQUEST', 'Error 400');
		const { _id, profile } = data;

		this.authEventEmitter.accountValidated(profile.email);

		const strategy = await this.getTokenStrategy(_id);
		return { strategy };
	}

	async askActivationToken(payload: DTOAuthEmail) {
		const { email } = payload;
		const query = { 'profile.email': email, is_active: false };
		const user = await this.usersService.findOneUser(query);
		if (user === null) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const activationToken = generateRandomToken();
		const update = { $set: { activationToken: activationToken } };
		this.usersService.findOneAndUpdateUser({ 'profile.email': email }, update);
		this.authEventEmitter.askActivationToken(email, activationToken);
	}

	async askResetToken(payload: DTOAuthEmail) {
		const { email } = payload;
		const query = { 'profile.email': email };
		const user = await this.usersService.findOneUser(query);
		if (user === null) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const resetToken = generateRandomToken();
		const update = { $set: { resetToken: resetToken } };
		this.usersService.findOneAndUpdateUser({ 'profile.email': email }, update);
		this.authEventEmitter.askResetPassword(email, resetToken);
	}

	async resetPassword(payload: DTOResetPassword) {
		const { password, resetToken, confirmPassword } = payload;
		await this.verifyResetToken({ resetToken });

		if (password !== confirmPassword) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const hashedPassword = await credentialsPassword(password);
		const update = { $set: { hashedPassword: hashedPassword } };
		await this.usersService.findOneAndUpdateUser({ resetToken }, update);
	}

	async verifyResetToken(payload: DTOResetToken) {
		const { resetToken } = payload;
		const userExists = await this.usersService.findOneUser({ resetToken });
		if (userExists === null) throw new ServiceError('BAD_REQUEST', 'Error 400');
	}

	async retrieveCurrentUser(userId: ObjectId) {
		const user = await this.usersService.findOneUser(
			{ _id: userId },
			{
				projection: {
					_id: 1,
					profile: 1,
				},
			},
		);
		if (user == null)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource.',
			);
		return user;
	}

	async checkAuth(userId: ObjectId) {
		const user = await this.usersService.findOneUser({ _id: userId });
		if (user === null)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource.',
			);
		return user;
	}
}
