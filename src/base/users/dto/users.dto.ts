import {
	STRICT_API_URL,
	STRICT_GITHUB_URL,
	STRICT_LINKEDIN_URL,
	STRICT_URL,
} from '@/common/constants/global';
import { IsValidDatePeriod } from '@/common/validators/IsValidDatePeriod.validator';
import { IsValidStringLength } from '@/common/validators/IsValidStringLength.validator';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	Length,
	Matches,
	Validate,
	ValidateNested,
} from 'class-validator';

class UserProfileDTO {
	@IsOptional()
	@IsString({ message: 'Invalid type format' })
	@Validate(IsValidStringLength, [[0, 9]])
	@Matches(/^(\d+)?$/, { message: 'Your phone number must contains only characters from 0 to 9' })
	phone: string;

	@IsOptional()
	@IsString({ message: 'Invalid type format' })
	@Validate(IsValidDatePeriod, [[-90, -13]])
	birthDate: Date;


	@IsOptional()
	@IsString({ message: 'Invalid type format' })
	@Length(0, 80, { message: 'Profile picture link must be between 0 and 80 characters' })
	@Matches(STRICT_API_URL, { message: 'Your profile picture must be a valid url' })
	picture: string;

}

export class ProfileBodyDTO {
	@IsOptional()
	@ValidateNested({ message: 'Invalid user profile' })
	@IsNotEmpty()
	@IsObject()
	@Type(() => UserProfileDTO)
	profile: UserProfileDTO;

}
