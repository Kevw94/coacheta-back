import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOneAndUpdateOptions, FindOptions, Db } from 'mongodb';
import { FitnessExercise } from './interfaces/fitness-exercises.interface';

@Injectable()
export class FitnessExercisesRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get fitnessExercises() {
		return this.db.collection<FitnessExercise>('fitness-exercises');
	}

	async findOne(query: Filter<FitnessExercise>, options: FindOptions<FitnessExercise> = undefined) {
		return this.fitnessExercises.findOne(query, options);
	}

	async findMany(query: Filter<FitnessExercise>, options: FindOptions<FitnessExercise> = undefined) {
		return this.fitnessExercises.find(query, options).toArray();
	}
	async getAllFitnessExercises() {
		return this.fitnessExercises.find().toArray();
	}
}
