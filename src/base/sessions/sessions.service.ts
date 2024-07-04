import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SessionsRepository } from '../sessions/sessions.repository';
import { CreateSessionDTO, UpdateSessionDTO } from '@/base/sessions/dto/sessions.dto';
import { ObjectId } from 'mongodb';
import { Session } from './interfaces/sessions.interface';

@Injectable()
export class SessionsService {
	constructor(
		@Inject(forwardRef(() => SessionsRepository))
		private sessionsRepository: SessionsRepository,
	) {}

	createNewSession(session: CreateSessionDTO) {
		const { creator_id } = session;

		const newSession = {
			...session,
			creator_id: creator_id,
		};

		return this.sessionsRepository.createSession(newSession);
	}

	async findSessionById(id: string) {
		return this.sessionsRepository.findOne({
			_id: new ObjectId(id),
		});
	}

	async findOneAndUpdateSession(userId: ObjectId, body: UpdateSessionDTO): Promise<Session> {
		const session = await this.sessionsRepository.findOne({
			_id: body._id,
			creator_id: userId,
		});
		if (!session) {
			throw new NotFoundException(`Session for user with ID ${userId} not found`);
		}

		await this.sessionsRepository.updateOneSession(
			{ _id: body._id, creator_id: userId },
			{ $set: body },
		);

		const updatedSession = this.sessionsRepository.findOne({ _id: body._id });
		return updatedSession;
	}

	async deleteOneSession(sessionId: ObjectId) {
		return this.sessionsRepository.deleteSessionById(sessionId);
	}

	async getSessions(userId: ObjectId) {
		const sessions = await this.sessionsRepository.findMany({ creator_id: userId });
		return sessions;
	}

	async getSessionById(sessionId: ObjectId) {
		const session = await this.sessionsRepository.findOne({ _id: sessionId });
		return session;
	}
}
