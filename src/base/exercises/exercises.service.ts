import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ExercisesRepository } from './exercises.repositoy';
import { ObjectId } from 'mongodb';
import { BodyPart } from './interfaces/exercises.interface';

@Injectable()
export class ExercisesService {
	constructor(
		@Inject(forwardRef(() => ExercisesRepository))
		private exercisesRepository: ExercisesRepository,
	) {}

	async getAllExercises() {
		return await this.exercisesRepository.getAllFitnessExercises();
	}

	async getOneExercise(exerciseId: string) {
		const exercise = await this.exercisesRepository.findOne({ _id: new ObjectId(exerciseId) });
		return exercise;
	}

	async getExerciseByCategory(category: BodyPart) {
		const exercise = await this.exercisesRepository.findMany({ bodyPart: category });
		return exercise;
	}
}
