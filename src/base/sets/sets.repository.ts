import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOneAndUpdateOptions, FindOptions, Db } from 'mongodb';
import { Set } from './interfaces/sets.interface';

@Injectable()
export class SetsRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get sets() {
		return this.db.collection<Set>('sets');
	}

	async createSets(query: Set) {
		return this.sets.insertOne(query);
	}

	async updateOneSets(query: Filter<Set>, update: Partial<Set> | UpdateFilter<Set>) {
		return this.sets.updateOne(query, update);
	}

	async findOneAndUpdateSet(
		query: Filter<Set>,
		update: UpdateFilter<Set>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		const updatedSet = await this.sets.findOneAndUpdate(query, update, options);
		console.log('updated set: ', updatedSet);
		return updatedSet;
	}

	async findOne(query: Filter<Set>, options: FindOptions<Set> = undefined) {
		return this.sets.findOne(query, options);
	}

	async SetsExist(query: Filter<Set>) {
		const options = { projection: { _id: 1 } };
		return this.sets.findOne(query, options);
	}
	async findMany(query: Filter<Set>, options: FindOptions<Set> = undefined) {
		return this.sets.find(query, options).toArray();
	}
	async getAllSets() {
		return this.sets.find().toArray();
	}

	async removeSet(query: Filter<Set>) {
		return this.sets.deleteOne(query);
	}
}
