import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './base/users/users.module';
import { DatabaseModule } from './external-modules/database/mongo.module';
import { MailjetModule } from './external-modules/mailjet/mailjet.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SessionsModule } from './base/sessions/sessions.module';
import { ProgramsModule } from './base/programs/programs.module';
import { ExercisesModule } from './base/exercises/exercises.module';
import { SeriesModule } from './base/series/series.module';
import { CalendarsModule } from './base/calendars/calendars.module';
import { FollowersModule } from './base/followers/followers.module';
import { FollowedModule } from './base/followed/followed.module';
import { ChatsModule } from './base/chats/chats.module';
import { NotificationsModule } from './base/notifications/notifications.module';

@Module({
    imports: [
		AuthModule,
		UsersModule,
		DatabaseModule,
		MailjetModule,
		EventEmitterModule.forRoot(),
		SessionsModule,
		ProgramsModule,
		ExercisesModule,
		SeriesModule,
		CalendarsModule,
		FollowersModule,
		FollowedModule,
		ChatsModule,
		NotificationsModule,
	],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
