import { EMAIL_FORMAT, STRICT_API_URL } from '@/common/constants/global';
import { IsValidDatePeriod } from '@/common/validators/IsValidDatePeriod.validator';
import { IsValidStringLength } from '@/common/validators/IsValidStringLength.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Length,
    Matches,
    Validate,
    ValidateNested,
} from 'class-validator';

class UserProfileDTO {
    @ApiProperty({
        type: String,
        example: '0654345442',
    })
    @IsOptional()
    @IsString({ message: 'Invalid type format' })
    @Validate(IsValidStringLength, [[0, 9]])
    @Matches(/^(\d+)?$/, { message: 'Your phone number must contains only characters from 0 to 9' })
    phone: string;

    @ApiProperty({
        type: Date,
        example: '13/05/1994',
    })
    @IsOptional()
    @IsString({ message: 'Invalid type format' })
    @Validate(IsValidDatePeriod, [[-90, -13]])
    birthDate: Date;

    @ApiProperty({
        type: String,
        example: 'image.jpeg',
    })
    @IsOptional()
    @IsString({ message: 'Invalid type format' })
    @Length(0, 80, { message: 'Profile picture link must be between 0 and 80 characters' })
    @Matches(STRICT_API_URL, { message: 'Your profile picture must be a valid url' })
    picture: string;

    @ApiProperty({
        type: String,
        example: 'Gilbert',
    })
    @IsOptional()
    @IsString({ message: 'Invalid type format' })
    @Length(0, 50, { message: 'firstname must be between 0 and 80 characters' })
    firstName: string;

    @ApiProperty({
        type: String,
        example: 'Lemonnier',
    })
    @IsOptional()
    @IsString({ message: 'Invalid type format' })
    @Length(0, 50, { message: 'lastname must be between 0 and 80 characters' })
    lastName?: string;

    @ApiProperty({
        example: 'lovex@gmail.com',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Length(8, 127)
    @Matches(EMAIL_FORMAT, { message: 'Invalid email' })
    public email?: string;

    @ApiProperty({
        example: 'kevw94',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    public username?: string;

    @ApiProperty({
        type: Number,
        example: 180,
    })
    @IsOptional()
    @IsNumber()
    @IsInt()
    size?: number;

    @ApiProperty({
        type: Number,
        example: 65,
    })
    @IsOptional()
    @IsNumber()
    @IsInt()
    weight?: number;

    @ApiProperty({
        type: Boolean,
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    gender?: boolean;

    @ApiProperty({
        type: Array,
        example: [0, 1],
    })
    @IsOptional()
    @IsArray()
    targets?: [];
}

export class UpdateProfileDTO {
    @IsOptional()
    @ValidateNested({ message: 'Invalid user profile' })
    @IsNotEmpty({ message: 'Profile should not be empty when provided' })
    @IsObject({ message: 'Profile must be an object' })
    @Type(() => UserProfileDTO)
    profile: UserProfileDTO;
}
