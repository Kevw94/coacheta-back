import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { SessionsRepository } from '../sessions/sessions.repository';

describe('SessionsService', () => {
	let service: SessionsService;
	const userId: ObjectId = new ObjectId('6629786312ccdffe8421f7aa');
	const mongoUri: string = 'mongodb://localhost:27090';
	const mongoDbName: string = 'coacheta';

	beforeEach(async () => {

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionsService,
				{
					provide: 'DATABASE_CONNECTION',
					useFactory: async (): Promise<Db> => {
						const client = await MongoClient.connect(mongoUri, {
						});

						return client.db(mongoDbName);
					},
				},
				SessionsRepository,
			],
		}).compile();

		service = module.get<SessionsService>(SessionsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return the correct session data', async () => {
		const sessions = await service.getSessions(userId);
		expect(Array.isArray(sessions)).toBe(true);
		sessions.forEach((session) => {
			expect(session).toHaveProperty('_id');
			expect(session).toHaveProperty('creator_id');
			expect(session).toHaveProperty('name');
			expect(session).toHaveProperty('description');
			expect(session).toHaveProperty('exercises_id');
			expect(session).toHaveProperty('coverImageUri');
		});
	});
});
