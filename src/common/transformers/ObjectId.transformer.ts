import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdTransformer implements PipeTransform {
	private isObjectIdKey(key: string): boolean {
		return key.includes('_id');
	}

	private transformToObjectId(val: string): ObjectId {
		try {
			return new ObjectId(val);
		} catch (err) {
			throw new BadRequestException(`Invalid ObjectId: ${val}`);
		}
	}

	private transformValue(val: any): any {
		if (Array.isArray(val)) {
			return val.map((item) => this.transformToObjectId(item));
		}
		return this.transformToObjectId(val);
	}

	transform(value: any): any {
		if (typeof value === 'string') {
			console.log('value: ', value);
			if (ObjectId.isValid(value)) {
				const returnedValue = this.transformToObjectId(value);
				console.log('returned value: ', returnedValue);
				return returnedValue;
			} else {
				console.log('value returned without change: ', value);
				return value;
			}
		}

		if (typeof value === 'object' && !Array.isArray(value)) {
			Object.keys(value).forEach((key) => {
				if (this.isObjectIdKey(key)) {
					value[key] = this.transformValue(value[key]);
				}
			});
			return value;
		}
		return value;
	}
}
