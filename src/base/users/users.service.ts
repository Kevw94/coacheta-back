import { Filter, FindOneAndUpdateOptions, FindOptions, ObjectId, UpdateFilter } from 'mongodb';
import { Inject, Injectable, forwardRef, Logger as NestLogger } from '@nestjs/common';
import { UsersRepository } from '@/base/users/users.repository';
import { ProfileBodyDTO } from '@/base/users/dto/users.dto';
import { flatten } from 'mongo-dot-notation';
import { User } from './interfaces/users.interface';
import { ServiceError } from '@/common/decorators/catch.decorator';

@Injectable()
export class UsersService {
	constructor(
		@Inject(forwardRef(() => UsersRepository))
		private usersRepository: UsersRepository,
	) {}


	async updateUserProfile(userId: ObjectId, body: ProfileBodyDTO) {
		const { username } = body.profile
		const userNameAlreadyExists = this.usersRepository.findOne({"profile.username": username})
		if (userNameAlreadyExists !== null) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const update = flatten(body);
		const query = { _id: userId };
		await this.usersRepository.updateOneUser(query, update);
	}

	async tryRegisterUser(user: User) {
		return this.usersRepository.createUser(user);
	}

	async isUserExists(email: string) {
		const userExists = await this.usersRepository.userExist({
			'profile.email': email,
		});
		return userExists;
	}

	async findOneUser(query: Filter<User>, options: FindOptions<User> = undefined) {
		const getOneUser = await this.usersRepository.findOne(query, options);
		return getOneUser;
	}

	async findOneAndUpdateUser(
		query: Filter<User>,
		update: UpdateFilter<User>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		const updateOneUser = await this.usersRepository.findOneAndUpdateUser(
			query,
			update,
			options,
		);
		return updateOneUser;
	}

	async getUserProfile(userId: string) {
		return this.usersRepository.findOne({ _id: new ObjectId(userId) });
	}

	async getAllUsers() {
		return this.usersRepository.findMany(
			{},
			{
				projection: { _id: 1, 'profile.password': 0 },
			},
		);
	}

	// async updateUserProfile(userId: string, body: UpdateUserProfileDTO) {
	// 	const update = flatten(body);
	// 	const query = { _id: new ObjectId(userId) };
	// 	await this.usersRepository.updateOneUser(query, update);
	// }

	async searchUser(search: string) {
		const query = {
			$or: [
				{ 'profil.username': new RegExp(search) },
				{ 'profile.email': new RegExp(search) },
			],
		};
		const users = await this.usersRepository.findMany(query, {
			projection: { _id: 1, 'profile.password': 0 },
		});
		return users;
	}

	async getUserById(id: string) {
		const user = await this.usersRepository.findOne(
			{ _id: new ObjectId(id) },
			{ projection: { _id: 1, 'profile.password': 0 } },
		);
		return user;
	}

}