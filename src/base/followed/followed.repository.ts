import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOneAndUpdateOptions, FindOptions, Db } from 'mongodb';
import { Followed } from './interfaces/followed.interface';

@Injectable()
export class FollowedRepository {
    constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

    get followedPeople() {
        return this.db.collection<Followed>('followed');
    }

    async findOne(query: Filter<Followed>, options: FindOptions<Followed> = undefined) {
        return this.followedPeople.findOne(query, options);
    }

    async findMany(query: Filter<Followed>, options: FindOptions<Followed> = undefined) {
        return this.followedPeople.find(query, options).toArray();
    }
    async getAllFitnessExercises() {
        return this.followedPeople.find().toArray();
    }
}
