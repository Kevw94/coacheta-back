import { Moment } from 'moment';
import { ObjectId } from 'mongodb';

export interface Training {
	_id?: ObjectId;
	session_id: string;
	creator_id: string;
	date: Moment;
	sets_id: string[];
	participants: Participant[];
	isDone: boolean;
}

export interface Participant {
	participant_id: string;
	status: StatusParticipant;
}

export enum StatusParticipant {
	invited = 'invited',
	confirmed = 'confirmed',
}
