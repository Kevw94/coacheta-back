import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class TrainingsDto {
    @ApiProperty({
        type: ObjectId,
        //example: "662b5612e742abc24928c348"
    })
    @IsMongoId()
    @IsNotEmpty()
    public session_id: ObjectId;

    @ApiProperty({
        type: ObjectId,
        //example: "662b5612e742abc24928c348"
    })
    @IsMongoId()
    @IsNotEmpty()
    public creator_id: ObjectId;

    @ApiProperty({
        type: Date,
        //example: "662b5612e742abc24928c348"
    })
    @IsDate()
    @IsNotEmpty()
    public date: Date;

    @ApiProperty({
        type: Array,
        //example: "662b5612e742abc24928c348"
    })
    @IsArray()
    @IsNotEmpty()
    public sets_id: ObjectId[];

    @ApiProperty({
        type: Array,
        //example: "662b5612e742abc24928c348"
    })
    @IsArray()
    @IsOptional()
    public participants: Participant[];

    @IsBoolean()
    @IsNotEmpty()
    // 	@ValidateNested({ message: 'Invalid exercises' })
    public isDone: boolean;
}

class Participant {
    participant_id: string;
    status: 'invited' | 'confirmed';
}
