import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { UsersRepository } from '../../base/users/users.repository';

describe('UsersService', () => {
	let service: UsersService;
	const requestedFriendName = 'mohamedn';
	const mongoUri: string = 'mongodb://localhost:27090';
	const mongoDbName: string = 'coacheta';
	const expectedFriendId: ObjectId = new ObjectId('6629786312ccdffe8421f7ae');

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				UsersRepository,
				{
					provide: 'DATABASE_CONNECTION',
					useFactory: async (): Promise<Db> => {
						const client = await MongoClient.connect(mongoUri, {});

						return client.db(mongoDbName);
					},
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('from name should get the corresponding user', async () => {
		const friendInfo = await service.getUserFromName(requestedFriendName);
		expect(friendInfo._id).toStrictEqual(expectedFriendId);
	});
});
