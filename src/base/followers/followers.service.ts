import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FollowersRepository } from '@/base/followers/followers.repository';

@Injectable()
export class FollowersService {
	constructor(
		@Inject(forwardRef(() => FollowersRepository))
		private followersRepository: FollowersRepository,
	) {}

	async getFollowers(userId: ObjectId) {
		const followers = await this.followersRepository.findOne({ user_id: userId });
		return followers;
	}

	async initFollowers(insertedId: ObjectId) {
		const followers = {
			user_id: insertedId,
			userFollowing: [],
		};

		this.followersRepository.createFollower(followers);
	}
}
