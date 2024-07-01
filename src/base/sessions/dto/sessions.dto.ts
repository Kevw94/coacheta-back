import { IsValidObjectId } from '@/common/validators/IsValidObjectId.validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateSessionDTO {
	@ApiProperty({
		type: ObjectId,
		example: '662b5612e742abc24928c348',
	})
	@Validate(IsValidObjectId)
	@IsNotEmpty()
	public creator_id: ObjectId;

	@ApiProperty({
		type: String,
		example: 'Séance pecs',
	})
	@IsNotEmpty()
	public name: string;

	@IsString()
	@IsOptional()
	public description: string;

	@IsArray()
	@IsNotEmpty()
	@Validate(IsValidObjectId)
	public exercises_id: ObjectId[];

	@IsOptional()
	coverImageUri: string;
}

export class GetSessionByIDDTO {
	@ApiProperty({
		type: String,
		//example: "662b5612e742abc24928c348"
	})
	@Validate(IsValidObjectId)
	@IsNotEmpty()
	public _id: string;
}

export class DeleteSessionDTO {
	@ApiProperty({
		type: String,
		//example: "662b5612e742abc24928c348"
	})
	@Validate(IsValidObjectId)
	@IsNotEmpty()
	public _id: string;
}

export class UpdateSessionDTO extends PartialType(CreateSessionDTO) {
	@ApiProperty({
		type: ObjectId,
		//example: "662b5612e742abc24928c348"
	})
	@Validate(IsValidObjectId)
	@IsNotEmpty()
	public _id: ObjectId;
}
