import { Inject, Injectable } from '@nestjs/common';
import { Filter, UpdateFilter, FindOptions, Db, ObjectId } from 'mongodb';
import { Session } from './interfaces/sessions.interface';
@Injectable()
export class SessionsRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get sessions() {
		return this.db.collection<Session>('sessions');
	}

	async createSession(query: Session) {
		return this.sessions.insertOne(query);
	}

	async updateOneSession(
		query: Filter<Session>,
		update: Partial<Session> | UpdateFilter<Session>,
	) {
		return this.sessions.updateOne(query, update);
	}

	async findOne(query: Filter<Session>, options: FindOptions<Session> = undefined) {
		return this.sessions.findOne(query, options);
	}

	async sessionExist(query: Filter<Session>) {
		const options = { projection: { _id: 1 } };
		return this.sessions.findOne(query, options);
	}
	async findMany(query: Filter<Session>, options: FindOptions<Session> = undefined) {
		return this.sessions.find(query, options).toArray();
	}
	async getAllSessions() {
		return this.sessions.find().toArray();
	}

	async deleteSessionById(sessionId: ObjectId) {
		return this.sessions.deleteOne({ _id: sessionId });
	}
}
