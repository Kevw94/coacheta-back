import { ObjectId } from 'mongodb';
import { Targets, UserProfile } from '../interfaces/users.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UserProfileEntity {
	@ApiProperty({
		type: String,
		example: "Gilbert"
	})
	firstName?: string;

	@ApiProperty({
		type: String,
		example: "Lemonnier"
	})
	lastName?: string;

	@ApiProperty({
		type: String,
		example: "lovex@gmail.com"
	})
	email?: string;

	@ApiProperty({
		type: String,
		example: "gigilebeaugosse"
	})
	username?: string;


	@ApiProperty({
		type: String,
		example: "0654345442"
	})
	phone?: string;

	@ApiProperty({
		type: Date,
		example: "13/05/1994"
	})
	birthDate?: Date;

	@ApiProperty({
		type: String,
		example: "image.jpeg"
	})
	picture?: string;

	@ApiProperty({
		type: Number,
		example: 65
	})
	size?: number;

	@ApiProperty({
		type: Number,
		example: 180
	})
	weight?: number;

	@ApiProperty({
		type: Boolean,
		example: true
	})
	gender?: boolean;

	@ApiProperty({
		type: Array<Enumerator>,
		example: [0, 1]
	})
	targets?: Array<Targets>
}


export class UserEntity {
	@ApiProperty({
		type: ObjectId,
		example: "ObjectId('66267514b4cf851b4df7fadb')"
	})
	_id?: ObjectId;

	@ApiProperty({
		type: UserProfileEntity,
	})
	profile?: UserProfile;

	@ApiPropertyOptional()
	hashedPassword?: string;

	@ApiPropertyOptional()
	activation_token?: string;

	@ApiPropertyOptional()
	resetToken?: string;

	@ApiProperty({
		type: Boolean,
		example: true
	})
	is_active?: boolean;

	@ApiProperty({
		type: Date,
		example: "2024-04-23T12:12:57.348Z"
	})
	created_at?: Date | string;
}