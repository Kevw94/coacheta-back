import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './base/users/users.module';
import { DatabaseModule } from './external-modules/database/mongo.module';
import { MailjetModule } from './external-modules/mailjet/mailjet.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
		AuthModule,
		UsersModule,
		DatabaseModule,
		MailjetModule,
		EventEmitterModule.forRoot(),
	],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
