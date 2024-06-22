import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FollowersRepository } from '@/base/followers/followers.repository';
import { UsersService } from '@/base/users/users.service';

@Injectable()
export class FollowersService {
	constructor(
		@Inject(forwardRef(() => FollowersRepository))
		private followersRepository: FollowersRepository,
		private usersService: UsersService,
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

		await this.followersRepository.createFollower(followers);
	}

	async addFollower(userId: ObjectId, name: string) {
		const follower = await this.followersRepository.findOne({
			user_id: userId,
		});

		if (!follower) {
			throw new NotFoundException(`Follower list for user with ID ${userId} not found`);
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

		// Check if the friend is already in the followers list
		const userFollowingArray = follower.userFollowing;
		const isAlreadyFriend = userFollowingArray.some((followingId) =>
			followingId.equals(friendId),
		);

		if (!isAlreadyFriend) {
			// Add the friend to the followers list
			await this.followersRepository.updateOneFollowers(
				{ _id: follower._id },
				{ $set: { ...follower, userFollowing: [...userFollowingArray, friendId] } },
			);
		}
	}
}
