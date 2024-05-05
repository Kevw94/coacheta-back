import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Type } from 'class-transformer';
import { ExercicesDto } from '@/base/exercices/dto/exercices.dto';
import { Serie } from '@/base/sessions/interfaces/sessions.interface';


class Resume {
    @ApiProperty({
        type: Array,
        //example: "0654345442"
    })
    @IsArray()
    series?: Serie[];

    @ApiProperty({
        type: Array,
        //example: "0654345442"
    })
    @IsArray()
    participants_id?: ObjectId[];
}

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
    public name?: string;

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
    @Type(() => ExercicesDto)
    public exercises: ExercicesDto[];

    @IsObject()
    @IsOptional()
    // 	@ValidateNested({ message: 'Invalid resume' })
    @Type(() => Resume)
    public resume: Resume;
}
