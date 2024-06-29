import { Inject } from '@nestjs/common';
import { Db, Filter, FindOneAndUpdateOptions, FindOptions, UpdateFilter } from 'mongodb';
import { Training } from './interfaces/trainings.interface';
import { CreateTrainingDTO } from './dto/trainings.dto';

export class TrainingsRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get trainings() {
		return this.db.collection<Training>('trainings');
	}

	async createTrainings(query: CreateTrainingDTO) {
		console.log(
			'TRAINING DATE IN REPOSITORY:' + query.date + ' typed as: ' + typeof query.date,
		);
		return this.trainings.insertOne(query);
	}

	async updateOneTrainings(
		query: Filter<Training>,
		update: Partial<Training> | UpdateFilter<Training>,
	) {
		return this.trainings.updateOne(query, update);
	}

	async findOneAndUpdateTrainings(
		query: Filter<Training>,
		update: UpdateFilter<Training>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		return this.trainings.findOneAndUpdate(query, update, options);
	}

	async findOne(query: Filter<Training>, options: FindOptions<Training> = undefined) {
		return this.trainings.findOne(query, options);
	}

	async trainingsExist(query: Filter<Training>) {
		const options = { projection: { _id: 1 } };
		return this.trainings.findOne(query, options);
	}
	async findMany(query: Filter<Training>, options: FindOptions<Training> = undefined) {
		console.log('query in repo: ', query);
		console.log('options: ', options);
		return this.trainings.find(query, options).toArray();
	}
	async getAlltrainings() {
		return this.trainings.find().toArray();
	}
}
