import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FollowedRepository } from '@/base/followed/followed.repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class FollowedService {
	constructor(
		@Inject(forwardRef(() => FollowedRepository))
		private followedRepository: FollowedRepository,
	) {}

	async getPeopleIfollowed(userId: ObjectId) {
		const followed = await this.followedRepository.findOne({ user_id: userId });
		return followed;
	}

	async initFollowed(insertedId: ObjectId) {
		const followed = {
			user_id: insertedId,
			userFollowed: [],
		};

		this.followedRepository.createFollowed(followed);


	}
}
