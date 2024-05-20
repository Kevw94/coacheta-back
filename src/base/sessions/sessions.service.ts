import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SessionsRepository } from '@/base/sessions/sessions.repository';
import { SessionsDto } from '@/base/sessions/dto/sessions.dto';
import {ObjectId} from "mongodb";

@Injectable()
export class SessionsService {
    constructor(
        @Inject(forwardRef(() => SessionsRepository))
        private sessionsRepository: SessionsRepository,
    ) {}

    createNewSession(session: SessionsDto) {
        return this.sessionsRepository.createSession(session);
    }

    getMySessions(user_id: ObjectId) {
        return this.sessionsRepository.findMany({ creator_id: user_id });
    }
}
