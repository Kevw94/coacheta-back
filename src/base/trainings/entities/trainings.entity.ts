import { ApiProperty } from '@nestjs/swagger';

export class Training {
    @ApiProperty({
        type: String,
    })
    session_id: string;

    @ApiProperty({
        type: String,
    })
    creator_id: string;

    @ApiProperty({
        type: Date,
    })
    date: Date;

    @ApiProperty({
        type: Array,
    })
    sets_id: string[];

    @ApiProperty({
        type: Array,
    })
    participants: Participant[];

    @ApiProperty({
        type: Boolean,
    })
    isDone: boolean;
}

class Participant {
    @ApiProperty({
        type: String,
    })
    participant_id: string;

    @ApiProperty({
        type: String,
    })
    status: 'invited' | 'confirmed';
}
