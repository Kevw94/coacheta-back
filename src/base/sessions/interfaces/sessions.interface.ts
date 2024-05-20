import {ObjectId} from "mongodb";

export interface Sessions {
    _id: ObjectId;
    creator_id: ObjectId;
    name: string;
    description: string;
    exercices_id: ObjectId[];
    coverImageUri: any;
}
