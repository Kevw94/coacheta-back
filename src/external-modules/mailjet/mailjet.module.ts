import { Module } from '@nestjs/common';
import { MailjetService } from './mailjet.service';
import { config } from 'src/config/config';
import * as MJ from 'node-mailjet';

@Module({
	providers: [
		{
			provide: 'MAILJET_CLIENT',
			useFactory: async (): Promise<MJ.Client> => {
			const mailjet = MJ.Client.apiConnect(config.mailjet.user, config.mailjet.pass);

				return mailjet;
			},
		},
		MailjetService,
	],
	exports: [MailjetService],
})
export class MailjetModule {}
