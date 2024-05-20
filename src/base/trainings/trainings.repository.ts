import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOneAndUpdateOptions, FindOptions, Db } from 'mongodb';
import { Training } from './interfaces/trainings.interface';
@Injectable()
export class SessionsRepository {
    constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

    get trainings() {
        return this.db.collection<Training>('trainings');
    }

    async createTraining(query: Training) {
        return this.trainings.insertOne(query);
    }

    async updateOneTraining(
        query: Filter<Training>,
        update: Partial<Training> | UpdateFilter<Training>,
    ) {
        return this.trainings.updateOne(query, update);
    }

    async findOneAndUpdateTraining(
        query: Filter<Training>,
        update: UpdateFilter<Training>,
        options: FindOneAndUpdateOptions = undefined,
    ) {
        return this.trainings.findOneAndUpdate(query, update, options);
    }

    async findOne(query: Filter<Training>, options: FindOptions<Training> = undefined) {
        return this.trainings.findOne(query, options);
    }

    async trainingExist(query: Filter<Training>) {
        const options = { projection: { _id: 1 } };
        return this.trainings.findOne(query, options);
    }
    async findMany(query: Filter<Training>, options: FindOptions<Training> = undefined) {
        return this.trainings.find(query, options).toArray();
    }
    async getAllTrainings() {
        return this.trainings.find().toArray();
    }
}
