import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Moment } from 'moment';
import { StatusParticipant } from '../interfaces/trainings.interface';

class ParticipantDto {
	@ApiProperty({
		type: String,
		example: 'participant_id_123',
	})
	@IsString()
	@IsNotEmpty()
	public participant_id: string;

	@ApiProperty({
		type: String,
		enum: StatusParticipant,
		example: 'confirmed',
	})
	@IsString()
	@IsNotEmpty()
	public status: StatusParticipant;
}

export class TrainingsDto {
	@ApiProperty({
		type: String,
		example: '662b5612e742abc24928c348',
	})
	@IsString()
	@IsNotEmpty()
	public session_id: string;

	@ApiProperty({
		type: String,
		example: '662b5612e742abc24928c348',
	})
	@IsString()
	@IsNotEmpty()
	public creator_id: string;

	@ApiProperty({
		type: Date,
		example: '2024-06-01T00:00:00.000Z',
	})
	@IsDate()
	@IsNotEmpty()
	public date: Moment;

	@ApiProperty({
		type: [String],
		example: ['set1', 'set2', 'set3'],
	})
	@IsArray()
	@IsString({ each: true })
	public sets_id: string[];

	@ApiProperty({
		type: [ParticipantDto],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ParticipantDto)
	public participants: ParticipantDto[];

	@ApiProperty({
		type: Boolean,
		example: false,
	})
	@IsBoolean()
	@IsNotEmpty()
	public isDone: boolean;
}
