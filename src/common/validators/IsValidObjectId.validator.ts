import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ObjectId } from 'mongodb';

@ValidatorConstraint({ name: 'isValidObjectId', async: false })
@Injectable()
export class IsValidObjectId implements ValidatorConstraintInterface {
	validate(value: string) {
		if (Array.isArray(value)) {
			return value.every((val) => ObjectId.isValid(val));
		}
		return ObjectId.isValid(value);
	}
}
