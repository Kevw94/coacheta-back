import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOptions, Db } from 'mongodb';
import { Followed } from './interfaces/followed.interface';

@Injectable()
export class FollowedRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get followedPeople() {
		return this.db.collection<Followed>('followed');
	}

	async createFollowed(query: Followed) {
		return this.followedPeople.insertOne(query);
	}

	async findOne(query: Filter<Followed>, options: FindOptions<Followed> = undefined) {
		return this.followedPeople.findOne(query, options);
	}

	async findMany(query: Filter<Followed>, options: FindOptions<Followed> = undefined) {
		return this.followedPeople.find(query, options).toArray();
	}
	async getFollowed() {
		return this.followedPeople.find().toArray();
	}

	async updateOneFollowed(
		query: Filter<Followed>,
		update: Partial<Followed> | UpdateFilter<Followed>,
	) {
		return this.followedPeople.updateOne(query, update);
	}
}
