import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { FollowersRepository } from '@/base/followers/followers.repository';
import {UsersService} from "@/base/users/users.service";

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

		this.followersRepository.createFollower(followers);


		// TODO Take exactly what i did from followed, refacto back, apply tests, refacto front
	}

	async addFollower(userId: ObjectId, name: any) {

		const follower = await this.followersRepository.findOne({
			user_id: userId,
		});

		if (!follower) {
			throw new NotFoundException(`Follower for user with ID ${userId} not found`);
		}

		const friendUser = await this.usersService.getUserFromName(name);

		if (!friendUser) {
			throw new NotFoundException(`Not valid Friend name`);
		}

		const friendId = friendUser._id;
		if (userId.equals(friendId)) {
			throw new BadRequestException('user id same as the requested one');
		}
		const friendsArray = follower.userFollowing;
		const alreadyFriend = follower.userFollowing.some((follower) => follower.equals(friendId));

		if (!alreadyFriend) {
			await this.followersRepository.updateOneFollowers(
				{ _id: follower._id },
				{ $set: { ...follower, userFollowing: [...friendsArray, friendId] } },
			);
		}
	}
}
