import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { SessionsRepository } from '../sessions/sessions.repository';
import { SessionsDto, UpdateSessionDto } from '@/base/sessions/dto/sessions.dto';
import { ObjectId } from 'mongodb';
import { Session } from './interfaces/sessions.interface';

@Injectable()
export class SessionsService {
	constructor(
		@Inject(forwardRef(() => SessionsRepository))
		private sessionsRepository: SessionsRepository,
	) {}

	createNewSession(session: SessionsDto) {
		const { creator_id } = session;

		const newSession = {
			...session,
			creator_id: new ObjectId(creator_id),
		};

		return this.sessionsRepository.createSession(newSession);
	}

	async findSessionById(id: string) {
		return this.sessionsRepository.findOne({
			_id: new ObjectId(id),
		});
	}

	async findOneAndUpdateSession(
		id: string,
		userId: ObjectId,
		body: UpdateSessionDto,
	): Promise<Session> {
		const formattedId = new ObjectId(id);
		const updatedBody = {
			...body,
			creator_id: new ObjectId(body.creator_id),
		};
		const session = await this.sessionsRepository.findOne({
			_id: formattedId,
			creator_id: userId,
		});
		if (!session) {
			throw new NotFoundException(`Session for user with ID ${userId} not found`);
		}

		await this.sessionsRepository.updateOneSession(
			{ _id: formattedId, creator_id: userId },
			{ $set: updatedBody },
		);

		const updatedSession = this.sessionsRepository.findOne({ _id: formattedId });
		console.log('updated session: ', updatedSession);
		return updatedSession;
	}

	async deleteOneSession(sessionId: string, userId: ObjectId) {
		const formattedSessionId = new ObjectId(sessionId);
		const session = await this.sessionsRepository.findOne({
			_id: formattedSessionId,
			creator_id: userId,
		});

		if (session.creator_id.equals(userId)) {
			return this.sessionsRepository.deleteSessionById(formattedSessionId);
		} else {
			throw new BadRequestException(`Session ${sessionId} cannot be deleted!`);
		}
	}

	async getSessions(userId: ObjectId) {
		const sessions = await this.sessionsRepository.findMany({ creator_id: userId });
		return sessions;
	}

	async getSessionById(sessionId: string) {
		const session = await this.sessionsRepository.findOne({_id: new ObjectId(sessionId)})
		return session;
	}
}
