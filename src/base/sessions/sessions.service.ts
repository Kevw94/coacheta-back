import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {SessionsRepository} from "@/base/sessions/sessions.repository";
import {Session} from "@/base/sessions/interfaces/sessions.interface";

@Injectable()
export class SessionsService {
    constructor(
        @Inject(forwardRef(() => SessionsRepository))
        private sessionsRepository: SessionsRepository,
    ) {}

    createNewSession(session: any) {
        return this.sessionsRepository.createSession(session);
    }
}
