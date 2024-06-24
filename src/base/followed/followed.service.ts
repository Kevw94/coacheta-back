import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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

		await this.followedRepository.createFollowed(followed);
	}

	async addFollowed(userId: ObjectId, name: string) {
		const followed = await this.followedRepository.findOne({
			user_id: userId,
		});

		if (!followed) {
			throw new NotFoundException(`Followed list for user with ID ${userId} not found`);
		}

		// Get the user information of the friend by their name
		const friendUser = await this.usersService.getUserFromName(name);

		if (!friendUser) {
			throw new NotFoundException(`Invalid friend name: ${name}`);
		}

		const friendId = friendUser._id;

		// Check if the user is trying to follow themselves
		if (userId.equals(friendId)) {
			throw new BadRequestException('User ID is the same as the requested friend ID');
		}

		// Check if the friend is already in the followed list
		const friendsArray = followed.userFollowed;
		const alreadyFriend = friendsArray.some((followedId) => followedId.equals(friendId));

		if (!alreadyFriend) {
			// Add the friend to the followed list
			await this.followedRepository.updateOneFollowed(
				{ _id: followed._id },
				{ $set: { ...followed, userFollowed: [...friendsArray, friendId] } },
			);
		}
	}
}
