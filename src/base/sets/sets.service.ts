import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SetsRepository } from './sets.repository';
import { ObjectId } from 'mongodb';
import { TrainingsService } from '@/trainings/trainings.service';
import { CreateSetDTO, DeleteSetDTO, UpdateSetDTO } from './dto/sets.dto';

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
		const options = { projection: { _id: 1 } };
		const setReturn = await this.setsRepository.findOne({
			_id: response.insertedId,
		});
		const trainingUpdate = await this.trainingsService.addSetTraining(body);
		console.log('TrainingUpdate', trainingUpdate);

		return { set: setReturn, training: trainingUpdate };
	}

	async deleteSet(body: DeleteSetDTO) {
		const query = { _id: body };
		const response = await this.setsRepository.removeSet(query);
		return response;
	}

	async getSetByTrainingId(userId: ObjectId, trainingId: ObjectId) {
		const query = { creator_id: userId, training_id: trainingId };
		const response = await this.setsRepository.findMany(query);
		console.log('response', response);

		return response;
	}

	async patchSet(set: UpdateSetDTO) {
		console.log('set to patch in service: ', set);
		const query = { _id: new Object(set._id) };
		const update = { $set: { 'sets.$': set } };
		const response = await this.setsRepository.findOneAndUpdateSet(query, update);
		console.log('response', response);
		return response;
	}
}
