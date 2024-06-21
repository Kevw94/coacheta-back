import { ObjectId } from 'mongodb';

export interface Followers {
	_id: ObjectId;
	user_id: ObjectId;
	userFollowing: Array<ObjectId>;
}
