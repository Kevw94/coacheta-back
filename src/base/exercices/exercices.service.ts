import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ExercicesRepository } from './exercices.repository';
import { BodyPart } from './interfaces/exercices.interface';

@Injectable()
export class ExercicesService {
	constructor(
		@Inject(forwardRef(() => ExercicesRepository))
		private exercisesRepository: ExercicesRepository,
	) {}

	async getAllFitnessExercises() {
		return await this.exercisesRepository.getAllFitnessExercises();
	}

	async getOneExercise(exerciseId: string) {
		const exercise = await this.exercisesRepository.findOne({_id: new ObjectId(exerciseId)})
		return exercise;
	}


	async getExerciseByCategory(category: BodyPart) {
		const exercise = await this.exercisesRepository.findMany({bodyPart: category})
		return exercise;
	}
}
