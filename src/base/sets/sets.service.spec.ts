import { Test, TestingModule } from '@nestjs/testing';
import { SetsService } from './sets.service';
import { TrainingsModule } from '@/trainings/trainings.module';
import { SetsRepository } from './sets.repository';
import { TrainingsService } from '@/trainings/trainings.service';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { forwardRef } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { Set } from './interfaces/sets.interface';
import { ObjectId } from 'mongodb';
import { Training } from '@/trainings/interfaces/trainings.interface';

describe('SetsService', () => {
	let service: SetsService;
	let repository: SetsRepository;
	let trainingsService: TrainingsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DatabaseModule,
				forwardRef(() => TrainingsModule),
			],
			providers: [
				SetsService,
				// SetsRepository,
				{
					provide: SetsRepository,
					useValue: {
						createSets: jest.fn(), // Mock the createSets method
						findOne: jest.fn(),    // Mock the findOne method
						removeSet: jest.fn(), // Mock the removeSet method
					},
				},
				{
					provide: TrainingsService,
					useValue: {
						addSetTraining: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<SetsService>(SetsService);
		repository = module.get<SetsRepository>(SetsRepository);
		trainingsService = module.get<TrainingsService>(TrainingsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createSet', () => {
		it('should create a set ', async () => {
			const set: Set = {
				"creator_id": "6634d54ac73d7a5b1e1f3dd0",
				"exercise_id": "6648b9f8535f1686ec821cba",
				"targets": {
					"weight": 80,
					"reps": 6
				},
				"results": null,
				"isDone": false,
				"training_id": "667c18786bc67a04a6fe6ed0"
			}


			const setResult = await service.createSets(set);
			set._id = setResult.set._id

			expect(setResult.set).toStrictEqual(set);
		});
	});


	describe('deleteSet', () => {
		it('should delete a set ', async () => {
			const setId = "667c18786bc67a04a6fe6ed0"
			const removeSetSpy = jest.spyOn(repository, 'removeSet').mockResolvedValue({
				acknowledged: true,
				deletedCount: 1,
			});

			await service.deleteSet(setId);

			expect(removeSetSpy).toHaveBeenCalledWith({ _id: new ObjectId(setId) });

		});
	});
});
