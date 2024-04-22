import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Check environement onfiguration
import '@/config/env.validator';
import { AppModule } from '@/app.module';
import { config } from '@/config/config';

async function bootstrap() {
	const PORT = config.app.port
    const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});
	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		transform: true,
	// 		disableErrorMessages: false,
	// 		whitelist: true,
	// 		enableDebugMessages: true,
	// 	}),
	// );

	// app.use(cookieParser());

	// app.enableCors(corsOptionsDelegate);

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
