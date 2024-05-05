import { ObjectId } from 'mongodb';
import { Result, Target } from '@/base/sessions/interfaces/sessions.interface';

export interface Serie {
    _id?: ObjectId;
    isDone?: boolean;
    exercise_id?: ObjectId;
    targets: Target;
    results: Result;
}

export interface Exercices {
    _id?: ObjectId;
    name?: string;
    category?: string;
    series?: Serie[];
}
