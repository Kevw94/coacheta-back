import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FitnessExercisesRepository } from './fitness-exercises.repositoy';
import { ObjectId } from 'mongodb';
import { BodyPart } from './interfaces/fitness-exercises.interface';

@Injectable()
export class FitnessExercisesService {
	constructor(
		@Inject(forwardRef(() => FitnessExercisesRepository))
		private fitnessExercisesRepository: FitnessExercisesRepository,
	) {}

	async getAllFitnessExercises() {
		return await this.fitnessExercisesRepository.getAllFitnessExercises();
	}

	async getOneExercise(exerciseId: string) {
		const exercise = await this.fitnessExercisesRepository.findOne({_id: new ObjectId(exerciseId)})
		return exercise;
	}


	async getExerciseByCategory(category: BodyPart) {
		const exercise = await this.fitnessExercisesRepository.findMany({bodyPart: category})
		return exercise;
	}


}
