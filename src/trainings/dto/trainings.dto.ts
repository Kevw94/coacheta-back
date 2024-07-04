import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { StatusParticipant } from '../interfaces/trainings.interface';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class ParticipantDTO {
	@ApiProperty({ example: '667e7bc8c70b483750c6540f' })
	@IsMongoId()
	participant_id: ObjectId;

	@ApiProperty({ enum: StatusParticipant })
	@IsEnum(StatusParticipant)
	status: StatusParticipant;
}

export class CreateTrainingDTO {
	@ApiProperty({ example: '667e7bc8c70b483750c6540d' })
	@IsMongoId()
	@IsNotEmpty()
	session_id: ObjectId;

	@ApiProperty({ example: '667e7bc8c70b483750c6540d' })
	@IsMongoId()
	@IsNotEmpty()
	creator_id: ObjectId;

	@ApiProperty({ example: '2024-06-29T10:00:00.000Z' })
	@IsNotEmpty()
	@Type(() => Date)
	@IsDate()
	date: Date;

	@ApiProperty({
		type: [String],
		example: ['6648b9f8535f1686ec8218cc', '6648b9f8535f1686ec8218d2'],
	})
	@IsArray()
	@IsMongoId({ each: true })
	sets_id: ObjectId[];

	@ApiProperty({ type: [ParticipantDTO] })
	@IsArray()
	@Type(() => ParticipantDTO)
	participants: ParticipantDTO[];

	@ApiProperty({ example: false })
	@IsNotEmpty()
	isDone: boolean;
}

export class GetTrainingsByDateDTO {
	@ApiProperty({ example: '2024-06-29T10:00:00.000Z' })
	@IsNotEmpty()
	@Type(() => Date)
	@IsDate()
	startDate: Date;

	@ApiProperty({ example: '2024-06-29T10:00:00.000Z' })
	@IsNotEmpty()
	@Type(() => Date)
	@IsDate()
	endDate: Date;
}

export class UpdateTrainingDTO extends PartialType(CreateTrainingDTO) {
	@IsMongoId()
	_id: ObjectId;
}
