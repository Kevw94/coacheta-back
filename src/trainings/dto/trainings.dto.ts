import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusParticipant } from '../interfaces/trainings.interface';
import { Type } from 'class-transformer';

export class ParticipantDTO {
	@ApiProperty({ example: '667e7bc8c70b483750c6540f' })
	@IsString()
	participant_id: string;

	@ApiProperty({ enum: StatusParticipant })
	@IsEnum(StatusParticipant)
	status: StatusParticipant;
}

export class CreateTrainingDTO {
	@ApiProperty({ example: '667e7bc8c70b483750c6540d' })
	@IsString()
	@IsNotEmpty()
	session_id: string;

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
	@IsString({ each: true })
	sets_id: string[];

	@ApiProperty({ type: [ParticipantDTO] })
	@IsArray()
	@Type(() => ParticipantDTO)
	participants: ParticipantDTO[];

	@ApiProperty({ example: false })
	@IsNotEmpty()
	isDone: boolean;
}
