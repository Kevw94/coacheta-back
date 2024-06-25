import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SetsRepository } from './sets.repository';
import { ObjectId, ReturnDocument } from 'mongodb';
import { Set } from './interfaces/sets.interface';
import { TrainingsService } from '@/trainings/trainings.service';

@Injectable()
export class SetsService {
	constructor(
		@Inject(forwardRef(() => SetsRepository))
		private setsRepository: SetsRepository,
		@Inject(forwardRef(() => TrainingsService))
		private trainingsService: TrainingsService,
	) {}

	async createSets(set: Set) {
		const response = await this.setsRepository.createSets(set);
		const options = { projection: { _id: 1 } };
		const setReturn = await this.setsRepository.findOne({_id: new ObjectId(response.insertedId)});
		console.log("setReturn,", setReturn);
		const trainingUpdate = await this.trainingsService.addSetTraining(set);
		console.log("TrainingUpdate", trainingUpdate);


		return setReturn;
	}

	// A tester
	async deleteSet(setId: string) {
		const query = { _id: new ObjectId(setId) };
		// Tester sans return le tableau et à voir
		const response = await this.setsRepository.removeSet(query)
		return response
	}

	async getSetByTainingId(userId: ObjectId, trainingId: string) {
		const query = { creator_id: userId.toString(), training_id: trainingId}
		const response = await this.setsRepository.findMany(query);
		console.log("response", response);

		return response;
	}

	async patchSet(set: Set) {
		const query = { _id: new Object(set._id)  };
		const update = { $set: { 'sets.$': set } };
		const response = await this.setsRepository.findOneAndUpdateSets(query, update);
		console.log("response", response);
		return response;

	}
}
