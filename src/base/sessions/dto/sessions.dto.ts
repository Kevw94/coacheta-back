import {ApiProperty} from "@nestjs/swagger";
import {
    IS_MONGO_ID,
    IsArray,
    IsBoolean,
    IsInt, IsMongoId,
    IsNotEmpty,
    IsNumber, IsObject,
    IsOptional,
    IsString,
    Length,
    Matches,
    Validate
} from "class-validator";
import {ObjectId} from "mongodb";
import {Type} from "class-transformer";
import {ExercicesDto} from "@/base/exercices/dto/exercices.dto";
import {Serie} from "@/base/sessions/interfaces/sessions.interface";
/*
   _id?: ObjectId;
    creator_id?: ObjectId;
    history?: Date[];
    exercises?: Exercice;
    resume?: Resume;
 */


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

class SessionsDto {
    @ApiProperty({
        type: ObjectId,
        //example: "0654345442"
    })
    @IsMongoId()
    creator_id: ObjectId;

    @ApiProperty({
        type: Array,
        example: '["1985-09-25 17:45:30.005", "1985-09-26 17:45:30.005"]'
    })
    @IsOptional()
    @IsArray({ message: 'Invalid type format' })
    history: Date[];


    @IsObject()
    @IsNotEmpty()
    // 	@ValidateNested({ message: 'Invalid exercises' })
    @Type(() => ExercicesDto)
    exercises: ExercicesDto[];

    @IsObject()
    @IsOptional()
    // 	@ValidateNested({ message: 'Invalid resume' })
    @Type(() => Resume)
    resume: Resume;


}
