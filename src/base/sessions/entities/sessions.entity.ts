import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class SessionEntity {
	@ApiProperty({
		type: ObjectId,
	})
	creator_id: ObjectId;

	@ApiProperty({
		type: String,
		example: 'Grosse séance pecs',
	})
	name: string;

	@ApiProperty({
		type: String,
		example: 'séeance de porc pour se détruire le chest tu connais',
	})
	desc: string;

	@ApiProperty({
		type: Array<string>,
	})
	exercises_id: Array<string>;

	@ApiProperty({
		type: String,
		example: 'image.jpeg',
	})
	coverImageUri?: string;
}
