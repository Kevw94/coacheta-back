import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { ObjectId } from 'mongodb';
import { SessionsRepository } from '../sessions/sessions.repository';

describe('SessionsService', () => {
	let service: SessionsService;
	const userId: ObjectId = new ObjectId('6629786312ccdffe8421f7ae');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionsService,
				{
					provide: SessionsRepository,
					useValue: {
						getSessions: jest.fn().mockResolvedValue([
							{
								_id: new ObjectId('664dfa02a890fa254b8b86b7'),
								creator_id: userId,
								name: 'Ma Séance 1',
								description: 'Description 1',
								exercises_id: [
									new ObjectId('662b5612e742abc24928c363'),
									new ObjectId('662b5612e742abc24928c38b'),
									new ObjectId('662b5612e742abc24928c38a'),
									new ObjectId('662b5612e742abc24928c73d'),
									new ObjectId('662b5612e742abc24928c7ad'),
									new ObjectId('662b5612e742abc24928c356'),
								],
								coverImageUri: { uri: '' },
							},
							{
								_id: new ObjectId('664e707746c240a7dcc8fa61'),
								creator_id: userId,
								name: 'Ma Séance 2',
								description: 'Une description 2',
								exercises_id: [
									new ObjectId('662b5612e742abc24928c7ad'),
									new ObjectId('662b5612e742abc24928c73d'),
									new ObjectId('662b5612e742abc24928c35e'),
									new ObjectId('662b5612e742abc24928c35c'),
									new ObjectId('662b5612e742abc24928c39c'),
								],
								coverImageUri: { uri: '' },
							},
							{
								_id: new ObjectId('664e70ed46c240a7dcc8fa62'),
								creator_id: userId,
								name: 'Ma Séance 3',
								description: 'Description 3',
								exercises_id: [new ObjectId('662b5612e742abc24928c370')],
								coverImageUri: { uri: '' },
							},
						]),
						findMany: jest.fn().mockResolvedValue([
							{
								_id: new ObjectId('664dfa02a890fa254b8b86b7'),
								creator_id: userId,
								name: 'Ma Séance 1',
								description: 'Description 1',
								exercises_id: [
									new ObjectId('662b5612e742abc24928c363'),
									new ObjectId('662b5612e742abc24928c38b'),
									new ObjectId('662b5612e742abc24928c38a'),
									new ObjectId('662b5612e742abc24928c73d'),
									new ObjectId('662b5612e742abc24928c7ad'),
									new ObjectId('662b5612e742abc24928c356'),
								],
								coverImageUri: { uri: '' },
							},
							{
								_id: new ObjectId('664e707746c240a7dcc8fa61'),
								creator_id: userId,
								name: 'Ma Séance 2',
								description: 'Une description 2',
								exercises_id: [
									new ObjectId('662b5612e742abc24928c7ad'),
									new ObjectId('662b5612e742abc24928c73d'),
									new ObjectId('662b5612e742abc24928c35e'),
									new ObjectId('662b5612e742abc24928c35c'),
									new ObjectId('662b5612e742abc24928c39c'),
								],
								coverImageUri: { uri: '' },
							},
							{
								_id: new ObjectId('664e70ed46c240a7dcc8fa62'),
								creator_id: userId,
								name: 'Ma Séance 3',
								description: 'Description 3',
								exercises_id: [new ObjectId('662b5612e742abc24928c370')],
								coverImageUri: { uri: '' },
							},
						]),
					},
				},
			],
		}).compile();

		service = module.get<SessionsService>(SessionsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return the correct session data', async () => {
		const sessions = await service.getSessions(userId);
		expect(sessions).toBeDefined();
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
