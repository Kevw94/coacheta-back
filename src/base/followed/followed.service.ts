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
}
