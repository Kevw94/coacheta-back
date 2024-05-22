import { ObjectId } from 'mongodb';

export interface Training {
	_id: ObjectId;
	session_id: string;
	date: Date;
	sets_id: string[];
	participants: Participant[];
	isDone: boolean;
}

export interface Participant {
	participant_id: string;
	status: StatusParticipant;
};

export enum StatusParticipant {
	invited = "invited",
	confirmed = "confirmed"
}