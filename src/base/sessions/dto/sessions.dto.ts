import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { forwardRef, Inject } from '@nestjs/common';

export class SessionsDto {
    @ApiProperty({
        type: ObjectId,
        //example: "662b5612e742abc24928c348"
    })
    @IsMongoId()
    @IsNotEmpty()
    public creator_id: ObjectId;

    @ApiProperty({
        type: String,
        //example: "662b5612e742abc24928c348"
    })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    public schedule: ScheduledDate[];

    @ApiProperty({
        type: Array,
        example: '["1985-09-25 17:45:30.005", "1985-09-26 17:45:30.005"]',
    })
    @IsOptional()
    @IsArray({ message: 'Invalid type format' })
    public history: Date[];

    @IsArray()
    @IsNotEmpty()
    // 	@ValidateNested({ message: 'Invalid exercises' })
    public exercises_id: ObjectId[];

    @IsArray()
    @IsOptional()
    // 	@ValidateNested({ message: 'Invalid exercises' })
    public sets_id: ObjectId[];

    @IsArray()
    @IsOptional()
    @Inject(forwardRef(() => Participant))
    // 	@ValidateNested({ message: 'Invalid exercises' })
    public participants_id: Participant[];

    @IsOptional()
    coverImageUri: any;
}

export class ScheduledDate {
    @IsDate()
    @IsNotEmpty()
    public date: Date;

    @IsBoolean()
    @IsNotEmpty()
    public isDone: boolean;
}

export class Participant {
    @IsArray()
    @IsNotEmpty()
    public participants_id: ObjectId[];

    @IsBoolean()
    @IsString()
    public status: 'invited' | 'confirmed';
}
