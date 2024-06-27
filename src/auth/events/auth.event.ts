import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailjetAskResetPassword, MailjetAskToken, MailjetEmail } from './auth.events.req';
import { Events } from '@/common/providers/interfaces/events.interface';

@Injectable()
export class AuthEventEmitter {
	constructor(@Inject('EventEmitter') private readonly eventEmitter: EventEmitter2) {}

	async askActivationToken(email: string, token: string) {
		this.eventEmitter.emit(Events.askActivationToken, new MailjetAskToken(email, token));
	}

	async askResetPassword(email: string, tokenUrl: string) {
		console.log(email, tokenUrl);

		this.eventEmitter.emit(
			Events.askResetPassword,
			new MailjetAskResetPassword(email, tokenUrl),
		);
	}

	async accountValidated(email: string) {
		this.eventEmitter.emit(Events.accountValidated, new MailjetEmail(email));
	}
}
