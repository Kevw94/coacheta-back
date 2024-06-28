import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Check environement onfiguration
import '@/config/env.validator';
import { AppModule } from '@/app.module';
import { config } from '@/config/config';
import { corsOptionsDelegate } from './config/cors';
import * as cors from 'cors';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const PORT = config.app.port;
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			disableErrorMessages: false,
			whitelist: true,
			enableDebugMessages: true,
		}),
	);
	const configSwagger = new DocumentBuilder()
		.setTitle('Coacheta')
		.setDescription('The Coacheta API')
		.setVersion('1.0')
		.addTag('Coacheta')
		.build();
	const document = SwaggerModule.createDocument(app, configSwagger);
	SwaggerModule.setup('api', app, document);

	app.use(cookieParser());

	app.enableCors(corsOptionsDelegate);

	await app.listen(PORT);

	return app.getUrl();
}

(async (): Promise<void> => {
	try {
		const url = await bootstrap();
		NestLogger.debug(`Nest application running at : ${url}`, 'Bootstrap');
	} catch (error) {
		NestLogger.error(error, 'Bootstrap');
	}
})();
