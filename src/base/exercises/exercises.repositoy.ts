import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOneAndUpdateOptions, FindOptions, Db } from 'mongodb';
import { Exercise } from './interfaces/exercises.interface';

@Injectable()
export class ExercisesRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get exercises() {
		return this.db.collection<Exercise>('exercises');
	}

	async findOne(query: Filter<Exercise>, options: FindOptions<Exercise> = undefined) {
		return this.exercises.findOne(query, options);
	}

	async findMany(query: Filter<Exercise>, options: FindOptions<Exercise> = undefined) {
		return this.exercises.find(query, options).toArray();
	}
	async getAllFitnessExercises() {
		return this.exercises.find().toArray();
	}
}
