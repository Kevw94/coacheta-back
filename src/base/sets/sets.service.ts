import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SetsRepository } from './sets.repository';
import { ObjectId } from 'mongodb';
import { TrainingsService } from '@/trainings/trainings.service';
import { CreateSetDTO, UpdateSetDTO } from './dto/sets.dto';

@Injectable()
export class SetsService {
	constructor(
		@Inject(forwardRef(() => SetsRepository))
		private setsRepository: SetsRepository,
		@Inject(forwardRef(() => TrainingsService))
		private trainingsService: TrainingsService,
	) {}

	async createSet(body: CreateSetDTO) {
		const response = await this.setsRepository.createSets(body);
		const setReturn = await this.setsRepository.findOne({
			_id: response.insertedId,
		});
		const trainingUpdate = await this.trainingsService.addSetTraining(body);
		console.log('TrainingUpdate', trainingUpdate);

		return { set: setReturn, training: trainingUpdate };
	}

	async deleteSet(id: ObjectId) {
		const query = { _id: id };
		const set = await this.setsRepository.findOne(query);

		console.log('SET TO DELETE: ', set);

		const deleteSetQuery = await this.setsRepository.removeSet(query);
		console.log(deleteSetQuery);

		// return await this.trainingsService.deleteSetsInTraining(id, set.training_id);
	}

	async getSetByTrainingId(userId: ObjectId, trainingId: ObjectId) {
		const query = { creator_id: userId, training_id: trainingId };
		const response = await this.setsRepository.findMany(query);

		return response;
	}

	async patchSet(set: UpdateSetDTO) {
		const query = { _id: set._id };
		const update = { $set: set };
		return await this.setsRepository.findOneAndUpdateSet(query, update);
	}
}
