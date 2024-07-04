import { ObjectId } from 'mongodb';

export interface Training {
	_id?: ObjectId;
	creator_id: ObjectId;
	session_id: ObjectId;
	date: Date;
	sets_id: ObjectId[];
	participants: Participant[];
	isDone: boolean;
}

export interface Participant {
	participant_id: ObjectId;
	status: StatusParticipant;
}

export enum StatusParticipant {
	invited = 'invited',
	confirmed = 'confirmed',
}
