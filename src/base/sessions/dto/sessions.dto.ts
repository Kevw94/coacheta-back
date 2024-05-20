import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

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

    @ApiProperty({
        type: String,
        //example: "662b5612e742abc24928c348"
    })
    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsArray()
    @IsNotEmpty()
    // 	@ValidateNested({ message: 'Invalid exercises' })
    public exercises_id: ObjectId[];

    @IsOptional()
    public coverImageUri: string;
}
