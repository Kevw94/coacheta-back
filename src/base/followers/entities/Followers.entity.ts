import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class FollowersEntity {
	@ApiProperty({
		type: ObjectId,
		example: "ObjectId('66267514b4cf851b4df7fadb')",
	})
	_id?: ObjectId;

	@ApiProperty({
		type: ObjectId,
		example: "ObjectId('66267514b4cf851b4df7fadb')",
	})
	user_id?: ObjectId;

	@ApiProperty({
		type: Array<ObjectId>,
		example: [
			new ObjectId('66267514b4cf851b4df7fadb'),
			new ObjectId('66267514b4cf851b4df7fadc'),
			new ObjectId('66267514b4cf851b4df7fadv'),
		],
	})
	userFollowing?: Array<ObjectId>;
}
