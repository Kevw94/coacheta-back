import { Inject, Injectable } from '@nestjs/common';
import { Filter, FindOptions, Db } from 'mongodb';
import { Followers } from './interfaces/followers.interface';

@Injectable()
export class FollowersRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get follower() {
		return this.db.collection<Followers>('followers');
	}

	async createFollower(query: Followers) {
		return this.follower.insertOne(query);
	}

	async findOne(query: Filter<Followers>, options: FindOptions<Followers> = undefined) {
		return this.follower.findOne(query, options);
	}

	async findMany(query: Filter<Followers>, options: FindOptions<Followers> = undefined) {
		return this.follower.find(query, options).toArray();
	}
	async getAllFitnessExercises() {
		return this.follower.find().toArray();
	}
}
