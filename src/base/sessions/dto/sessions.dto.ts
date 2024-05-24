import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SessionsDto {
	@ApiProperty({
		type: String,
		//example: "662b5612e742abc24928c348"
	})
	@IsString()
	@IsNotEmpty()
	public creator_id: string;

	@ApiProperty({
		type: String,
		//example: "662b5612e742abc24928c348"
	})
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
	@IsOptional()
	public description: string;

	@IsArray()
	@IsNotEmpty()
	// 	@ValidateNested({ message: 'Invalid exercises' })
	public exercises_id: string[];

	@IsOptional()
	coverImageUri: any;
}
