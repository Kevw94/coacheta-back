import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

import { EMAIL_FORMAT, PASSWORD_FORMAT } from '@/common/constants/global';
import { ApiProperty } from '@nestjs/swagger';

export class DTOAuthSignup {
	@ApiProperty({
		example: 'kevw94',
	})
	@IsNotEmpty()
	@IsString()
	@Length(2, 50)
	public username: string;

	@ApiProperty({
		example: 'lovex@gmail.com',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 127)
	@Matches(EMAIL_FORMAT, { message: 'Invalid email' })
	public email: string;

	@ApiProperty({
		example: 'test1234@!@',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 40)
	@Matches(PASSWORD_FORMAT, { message: 'Password too weak' })
	public password: string;
}

export class DTOAuthSignin {
	@ApiProperty({
		type: String,
		example: 'lovex@gmail.com',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 127)
	@Matches(EMAIL_FORMAT, { message: 'Invalid email' })
	public email: string;

	@ApiProperty({
		type: String,
		example: 'test1234@!@',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 40)
	@Matches(PASSWORD_FORMAT, { message: 'Password too weak' })
	public password: string;
}

export class DTOResetToken {
	@IsNotEmpty()
	@IsString()
	@Length(32, 32)
	public resetToken: string;
}

export class DTOResetPassword {
	@ApiProperty({
		type: String,
		minimum: 8,
		maximum: 40,
		example: 'test1234@!@',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 40)
	@Matches(PASSWORD_FORMAT, { message: 'Password too weak' })
	public password: string;

	@ApiProperty({
		type: String,
		minimum: 8,
		maximum: 40,
		example: 'test1234@!@',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 40)
	@Matches(PASSWORD_FORMAT, { message: 'Password too weak' })
	public confirmPassword: string;

	@ApiProperty({
		type: String,
		minimum: 32,
		maximum: 32,
		example: 'dErtadErtadErtadErtadErtadErta23',
	})
	@IsNotEmpty()
	@IsString()
	@Length(32, 32)
	public resetToken: string;
}

export class DTOActivationToken {
	@ApiProperty({
		type: String,
		minimum: 6,
		maximum: 6,
		example: '5e34fG',
	})
	@IsNotEmpty()
	@IsString()
	@Length(6, 6)
	public activationToken: string;
}

export class DTOAuthEmail {
	@ApiProperty({
		type: String,
		example: 'lovex@gmail.com',
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 127)
	@Matches(EMAIL_FORMAT, { message: 'Invalid email' })
	public email: string;
}
