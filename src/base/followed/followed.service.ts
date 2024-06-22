import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FollowedRepository } from '@/base/followed/followed.repository';
import { ObjectId } from 'mongodb';
import { UsersService } from '@/base/users/users.service';

@Injectable()
export class FollowedService {
	constructor(
		@Inject(forwardRef(() => FollowedRepository))
		private followedRepository: FollowedRepository,
		private usersService: UsersService,
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

	async addFollowed(userId: ObjectId, name: any) {
		console.log('seervice ');
		console.log(name);
		console.log('service ');

		const followed = await this.followedRepository.findOne({
			user_id: userId,
		});

		if (!followed) {
			throw new NotFoundException(`Followed for user with ID ${userId} not found`);
		}

		const friendUser = await this.usersService.getUserFromName(name);

		if (!friendUser) {
			throw new NotFoundException(`Not valid Friend name`);
		}

		const friendId = friendUser._id;
		const friendsArray = followed.userFollowed;
		const alreadyFriend = followed.userFollowed.some((followed) => followed.equals(friendId));

		console.log(alreadyFriend);
		if (!alreadyFriend) {
			await this.followedRepository.updateOneFollowed(
				{ _id: followed._id },
				{ $set: { ...followed, userFollowed: [...friendsArray, friendId] } },
			);
		}
	}
}
