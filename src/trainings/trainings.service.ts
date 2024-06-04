import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrainingsRepository } from './trainings.repository';
import { ObjectId } from 'mongodb';
import { TrainingsDto } from './dto/trainings.dto';

@Injectable()
export class TrainingsService {
	constructor(
		@Inject(forwardRef(() => TrainingsRepository))
		private trainingsRepository: TrainingsRepository,
	) {}

	async createTraining(userId: ObjectId, body: TrainingsDto) {
		const formattedId = userId.toString();
		if (body.creator_id === formattedId) {
			return this.trainingsRepository.createTraining(body);
		} else {
			throw new BadRequestException('you cannot create a training!');
		}
	}

	async getUsersTrainings(id: ObjectId) {
		const trainings = await this.trainingsRepository.findMany({ _id: id });
		return trainings;
	}

	// async getTrainingsByDate(id: ObjectId, startDate: string, endDate?: string) {
	// 	const start = new Date(startDate);
	// 	const startOfDay = new Date(start.setHours(0, 0, 0, 0));

	// 	if (endDate) {
	// 		const end = new Date(endDate);
	// 		const endOfDay = new Date(end.setHours(23, 59, 59, 999));
	// 		const trainings = await this.trainingsRepository.findMany({
	// 			_id: id,
	// 			date: {
	// 				$gte: startOfDay,
	// 				$lte: endOfDay,
	// 			},
	// 		});
	// 		return trainings;
	// 	} else {
	// 		const endOfDay = new Date(start.setHours(23, 59, 59, 999));
	// 		const trainings = await this.trainingsRepository.findMany({
	// 			_id: id,
	// 			date: {
	// 				$gte: startOfDay,
	// 				$lte: endOfDay,
	// 			},
	// 		});
	// 		return trainings;
	// 	}
	// }
}
