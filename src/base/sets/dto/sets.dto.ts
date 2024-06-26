import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SetsDeleteDto {
	@ApiProperty({
		type: String,
		//example: "662b5612e742abc24928c348"
	})
	@IsString()
	@IsNotEmpty()
	public _id: string;
}
