import { Inject, Injectable } from '@nestjs/common';
import {Filter, FindOptions, Db, UpdateFilter} from 'mongodb';
import { Followers } from './interfaces/followers.interface';
import {Followed} from "@/base/followed/interfaces/followed.interface";

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
	async getAllFollowers() {
		return this.follower.find().toArray();
	}

	async updateOneFollowers(
		query: Filter<Followers>,
		update: Partial<Followers> | UpdateFilter<Followers>,
	) {
		return this.follower.updateOne(query, update);
	}
}
