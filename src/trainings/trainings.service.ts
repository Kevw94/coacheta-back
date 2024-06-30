import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrainingsRepository } from './trainings.repository';
import { Filter, ObjectId, ReturnDocument } from 'mongodb';
import { Training } from './interfaces/trainings.interface';
import { Set } from '@/base/sets/interfaces/sets.interface';
import { CreateTrainingDTO } from './dto/trainings.dto';

@Injectable()
export class TrainingsService {
	constructor(
		@Inject(forwardRef(() => TrainingsRepository))
		private trainingsRepository: TrainingsRepository,
	) {}

	async getUsersTrainings(id: ObjectId) {
		const trainings = await this.trainingsRepository.findMany({ _id: id });
		return trainings;
	}

	async getTrainingsByDate(
		userId: ObjectId,
		startDate: Date,
		endDate: Date,
	): Promise<Training[]> {
		const start = startDate;
		const end = endDate;

		const query: Filter<Training> = {
			creator_id: userId.toHexString(),
			date: {
				$gte: start,
				$lte: end,
			},
		};

		const response = await this.trainingsRepository.findMany(query);
		console.log('res in training service: ', response);
		return response;
	}

	async createTraining(training: CreateTrainingDTO) {
		const response = await this.trainingsRepository.createTrainings(training);
		const trainingResponse = await this.trainingsRepository.findOne({
			_id: new ObjectId(response.insertedId),
		});
		return trainingResponse;
	}

	async addSetTraining(set: Set) {
		const query = { _id: new ObjectId(set.training_id) };
		const update = { $push: { sets_id: set._id.toString() } };
		const options = { returnDocument: ReturnDocument.AFTER };
		const response = await this.trainingsRepository.findOneAndUpdateTrainings(
			query,
			update,
			options,
		);
		return response;
	}
}
