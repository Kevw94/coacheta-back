import {ObjectId} from "mongodb";
import {ApiProperty} from "@nestjs/swagger";

export class Sessions {
    @ApiProperty({
        type: ObjectId,
    })
    creator_id: ObjectId;

    @ApiProperty({
        type: String,
    })
    name: string;

    @ApiProperty({
        type: String,
    })
    description: string;


    @ApiProperty({
        type: Array,
    })
    exercices_id: ObjectId[];

    /*@ApiProperty({
        type: ??,
    })
    coverImageUri: any;*/
}
