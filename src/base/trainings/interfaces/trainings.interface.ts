import { ObjectId } from 'mongodb';

export interface Training {
    _id: ObjectId;
    session_id: ObjectId;
    creator_id: ObjectId;
    date: Date;
    sets_id: ObjectId[];
    participants: Participant[];
    isDone: boolean;
}

export interface Participant {
    participant_id: string;
    status: 'invited' | 'confirmed';
}
