import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {SessionsRepository} from "@/base/sessions/sessions.repository";
import {Session} from "@/base/sessions/interfaces/sessions.interface";
import {SessionsDto} from "@/base/sessions/dto/sessions.dto";

@Injectable()
export class SessionsService {
    constructor(
        @Inject(forwardRef(() => SessionsRepository))
        private sessionsRepository: SessionsRepository,
    ) {}

    createNewSession(session: SessionsDto) {
        return this.sessionsRepository.createSession(session);
    }
}
