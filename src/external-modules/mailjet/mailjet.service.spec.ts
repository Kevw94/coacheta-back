import { Test, TestingModule } from '@nestjs/testing';
import { MailjetService } from './mailjet.service';
import { MailjetModule } from './mailjet.module';

describe('MailjetService', () => {
	let service: MailjetService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MailjetModule],
		}).compile();

		service = module.get<MailjetService>(MailjetService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
