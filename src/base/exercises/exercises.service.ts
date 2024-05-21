import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ExercisesRepository } from './exercises.repository';
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

    async getExercisesByCategory(category: BodyPart, page: number, limit: number) {
        console.log(`Filtering exercises by category: ${category}, page: ${page}, limit: ${limit}`);
        const exercises = await this.exercisesRepository.findManyWithPagination(
            { bodyPart: category },
            page,
            limit,
        );
        return exercises;
    }
}
