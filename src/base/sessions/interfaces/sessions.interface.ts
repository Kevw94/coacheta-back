import { ObjectId } from 'mongodb';
import { Exercices } from '@/base/exercices/interfaces/exercices.interface';

export interface Target {
    weight: number;
    reps: number;
}

export interface Result {
    weight?: number;
    reps?: number;
    totalVolume?: number;
    intensity?: number;
}

export interface Serie {
    _id?: ObjectId;
    isDone?: boolean;
    exercise_id?: ObjectId;
    targets: Target;
    results: Result;
}

export interface Resume {
    series?: Serie[];
    participants_id?: ObjectId[];
}

export interface Session {
    _id?: ObjectId;
    name?: string;
    creator_id?: ObjectId;
    history?: Date[];
    exercises?: Exercices[];
    resume?: Resume;
}
