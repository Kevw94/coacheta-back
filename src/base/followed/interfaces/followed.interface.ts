import { ObjectId } from 'mongodb';

export interface Followed {
	_id?: ObjectId;
	user_id: ObjectId;
	userFollowed: Array<ObjectId>;
}
