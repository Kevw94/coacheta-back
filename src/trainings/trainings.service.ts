import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrainingsRepository } from './trainings.repository';
import { Filter, ObjectId, ReturnDocument } from 'mongodb';
import { Training } from './interfaces/trainings.interface';
import { Set } from '@/base/sets/interfaces/sets.interface';

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

	async getTrainingsByDate(id: ObjectId, startDate: string, endDate?: string) {
		const start = new Date(startDate);
		const startOfDay = new Date(start.setHours(0, 0, 0, 0));

		if (endDate) {
			const end = new Date(endDate);
			const endOfDay = new Date(end.setHours(23, 59, 59, 999));
			const trainings = await this.trainingsRepository.findMany({
				_id: id,
				date: {
					$gte: startOfDay,
					$lte: endOfDay,
				},
			});
			return trainings;
		} else {
			const endOfDay = new Date(start.setHours(23, 59, 59, 999));
			const trainings = await this.trainingsRepository.findMany({
				_id: id,
				date: {
					$gte: startOfDay,
					$lte: endOfDay,
				},
			});
			return trainings;
		}
	}

	async createTraining(training: Training) {
		const response = await this.trainingsRepository.createTrainings(training);
		const trainingResponse = await this.trainingsRepository.findOne({_id: new ObjectId(response.insertedId)})
		return trainingResponse;
	}


	async addSetTraining(set: Set) {
		const query = { _id: new ObjectId(set.training_id) }
		const update = { $push: {"sets_id": set._id.toString()}}
		const options = { returnDocument: ReturnDocument.AFTER};
		const response = await this.trainingsRepository.findOneAndUpdateTrainings(query, update, options);
		return response
	}
}
