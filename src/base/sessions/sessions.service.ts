import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SessionsRepository } from '@/base/sessions/sessions.repository';
import { SessionsDto } from '@/base/sessions/dto/sessions.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class SessionsService {
    constructor(
        @Inject(forwardRef(() => SessionsRepository))
        private sessionsRepository: SessionsRepository,
    ) {}

    createNewSession(session: SessionsDto) {
        const { creator_id, exercises_id } = session;

        const newSession = {
            ...session,
            creator_id: new ObjectId(creator_id),
            exercises_id: exercises_id.map(exercise_id => new ObjectId(exercise_id))
        };
        console.log(newSession);

        return this.sessionsRepository.createSession(newSession);
    }

    getMySessions(user_id: ObjectId) {
        return this.sessionsRepository.findMany({ creator_id: user_id });
    }
}
