import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

class SetTargets {
	@ApiProperty({
		type: Number,
		example: 80,
	})
	@IsNumber()
	@IsNotEmpty()
	weight: number;

	@ApiProperty({
		type: Number,
		example: 6,
	})
	@IsNumber()
	@IsNotEmpty()
	reps: number;
}

class SetResults {
	@ApiProperty({
		type: Number,
		example: 80,
	})
	@IsNumber()
	@IsNotEmpty()
	weight: number;

	@ApiProperty({
		type: Number,
		example: 6,
	})
	@IsNumber()
	@IsNotEmpty()
	reps: number;

	@ApiProperty({
		type: Number,
		example: 480,
	})
	@IsNumber()
	@IsNotEmpty()
	totalVolume: number;

	@ApiProperty({
		type: Number,
		example: 100,
	})
	@IsNumber()
	@IsNotEmpty()
	intensity: number;
}
export class CreateSetDTO {
	@ApiProperty({
		type: String,
		example: '662b5612e742abc24928c348',
	})
	@IsMongoId()
	@IsNotEmpty()
	public creator_id: ObjectId;

	@ApiProperty({
		type: String,
		example: '662b5612e742abc24928c348',
	})
	@IsMongoId()
	@IsNotEmpty()
	public exercise_id: ObjectId;

	@ApiProperty({
		type: String,
		example: '662b5612e742abc24928c348',
	})
	@IsMongoId()
	@IsNotEmpty()
	public training_id: ObjectId;

	@ApiProperty({
		type: Object,
		example: { weight: 80, reps: 6 },
	})
	@IsNotEmpty()
	public targets: SetTargets;

	@ApiProperty({
		type: Object,
		example: { weight: 80, reps: 6, totalVolume: 480, intensity: 100 },
	})
	@IsOptional()
	public results: SetResults | null;

	@ApiProperty({
		type: Boolean,
		example: false,
	})
	@IsNotEmpty()
	public isDone: boolean;
}

export class UpdateSetDTO extends PartialType(CreateSetDTO) {
	@ApiProperty({
		type: ObjectId,
		//example: "662b5612e742abc24928c348"
	})
	@IsMongoId()
	@IsNotEmpty()
	public _id: ObjectId;
}
