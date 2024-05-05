/*

export interface Serie {
    _id?: ObjectId;
    isDone?: boolean;
    exercise_id?: ObjectId;
    targets: Target;
    results: Result;
}

export interface Exercice {
    _id?: ObjectId;
    name?: string;
    category?: string;
    series?: Serie[];
}

 */

import {
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Type } from 'class-transformer';

class Target {
    weight: number;

    reps: number;
}

class Result {
    weight: number;
    reps: number;
    totalVolume: number;
    intensity: number;
}

export class Series {
    @ApiProperty({
        type: Boolean,
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isDone?: boolean;

    @ApiProperty({
        type: ObjectId,
        //example: "0654345442"
    })
    @IsMongoId()
    exercise_id?: ObjectId;

    @IsObject()
    @IsNotEmpty()
    // 	@ValidateNested({ message: 'Invalid resume' })
    @Type(() => Target)
    targets: Target;

    @IsObject()
    @IsNotEmpty()
    // 	@ValidateNested({ message: 'Invalid resume' })
    @Type(() => Result)
    results: Result;
}

export class ExercicesDto {
    @ApiProperty({
        type: ObjectId,
        //example: "0654345442"
    })
    @IsMongoId()
    @IsOptional()
    _id: ObjectId;

    @ApiProperty({
        type: String,
        example: 'Jambes',
    })
    @IsOptional()
    @IsString({ message: 'Invalid type format' })
    @IsNotEmpty()
    @Length(0, 100, { message: 'category must be between 0 and 100 characters' })
    category?: string;


    @ApiProperty({
        type: String,
        example: 'Squat',
    })
    @IsNotEmpty()
    @IsString({ message: 'Invalid type format' })
    @Length(0, 100, { message: 'exercise name must be between 0 and 100 characters' })
    name?: string;



    @IsObject()
    @IsOptional()
    // 	@ValidateNested({ message: 'Invalid resume' })
    @Type(() => Series)
    series?: Series[];
}
