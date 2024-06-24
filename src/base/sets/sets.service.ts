import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SetsRepository } from './sets.repository';
import { ObjectId, ReturnDocument } from 'mongodb';
import { Set } from './interfaces/sets.interface';

@Injectable()
export class SetsService {
	constructor(
		@Inject(forwardRef(() => SetsRepository))
		private setsRepository: SetsRepository,
	) {}

	async createSets(set: Set) {
		const response = await this.setsRepository.createSets(set);
		const setReturn = await this.setsRepository.findOne({_id: new ObjectId(response.insertedId)});
		return setReturn;
	}

	// A tester
	async deleteSet(setId: string) {
		const query = { _id: new ObjectId(setId) };
		// Tester sans return le tableau et à voir
		const response = await this.setsRepository.removeSet(query)
		return response
	}
}
