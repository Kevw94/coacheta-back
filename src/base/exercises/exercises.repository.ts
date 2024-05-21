import { Inject, Injectable } from '@nestjs/common';
import { Filter, FindOptions, Db } from 'mongodb';
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
    async findManyWithPagination(query: Filter<Exercise>, page: number, limit: number) {
        const skip = (page - 1) * limit;
        console.log(`query with pagination:`, query, `page: ${page}, limit: ${limit}`);
        return this.exercises.find(query).skip(skip).limit(limit).toArray();
    }
    async getAllFitnessExercises() {
        return this.exercises.find().toArray();
    }
}
