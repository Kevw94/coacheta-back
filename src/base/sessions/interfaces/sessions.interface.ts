import { ObjectId } from 'mongodb';

export interface Session {
	_id?: ObjectId;
	creator_id: ObjectId;
	name: string;
	description?: string;
	exercises_id: String[];
	coverImageUri?: string;
}
