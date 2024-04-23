import { MailjetEmail } from '@/auth/events/auth.events.req';
import { config } from '@/config/config';
import {
	MailerAskResetPassword,
	MailerAskToken,
} from '@/external-modules/mailjet/interfaces/mailjet.interface';
import { MailjetService } from '@/external-modules/mailjet/mailjet.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailjetTemplate } from './interfaces/events.interface';

Injectable();
export class MailjetListeners {
	constructor(
		@Inject(MailjetService)
		private readonly mailjetService: MailjetService,
	) {}

	@OnEvent('Events.askActivationToken')
	async handleaskActivationToken(payload: MailerAskToken) {
		const code = payload.token;
		const email = payload.email;
		this.mailjetService.sendUniversalEmail({
			templateId: MailjetTemplate.askActivationToken,
			recipients: [{ Email: email }],
			args: { code: code },
		});
	}

	@OnEvent('Events.askResetPassword')
	async handleAskResetPassword(payload: MailerAskResetPassword) {
		const urlReset = `${config.app.base}:${config.app.port}/reset-password?token=${payload.tokenUrl}`;
		const email = payload.email;
		this.mailjetService.sendUniversalEmail({
			templateId: MailjetTemplate.askResetPassword,
			recipients: [{ Email: email }],
			args: { url: urlReset },
		});
	}

	@OnEvent('Events.accountValidated')
	async accountValidated(payload: MailjetEmail) {
		const { email } = payload;

		this.mailjetService.sendUniversalEmail({
			templateId: MailjetTemplate.accountValidated,
			recipients: [{ Email: email }],
		});
	}
}
