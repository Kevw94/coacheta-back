import { ObjectId } from 'mongodb';

export interface Session {
    _id?: ObjectId;
    name?: string;
    creator_id?: ObjectId;
    schedule: ScheduledDate[];
    history?: Date[];
    exercises_id?: ObjectId[];
    sets_id?: ObjectId[];
    participants_id?: Participant[];
}

export interface ScheduledDate {
    date: Date;
    isDone: boolean;
}

export interface Participant {
    participants_id: ObjectId[];
    status: 'invited' | 'confirmed';
}
