import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { SessionsRepository } from '@/base/sessions/sessions.repository';

@Module({
    imports: [DatabaseModule],
    providers: [SessionsService, SessionsRepository],
    controllers: [SessionsController],
    exports: [SessionsService],
})
export class SessionsModule {}
