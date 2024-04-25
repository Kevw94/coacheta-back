import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger as NestLogger } from '@nestjs/common';
import { config } from '@/config/config';
import { JwtPayload, JwtTokenData } from '../interfaces/jwt.interface';
import { Request } from 'express';
import { ObjectId } from 'mongodb';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			ignoreExpiration: false,
			secretOrKey: config.jwt.secret,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					try {
						const data = <string>req?.cookies['token'];
						if (!data) return null;

						const parsed = <JwtTokenData>JSON.parse(data);
						return parsed.token;
					} catch (err) {
						if (err instanceof Error) {
							NestLogger.error(err.message);
						}
						return null;
					}
				},
			]),
		});
	}

	async validate(payload: JwtPayload) {
		if (!payload?.id) throw new UnauthorizedException();
		payload.id = new ObjectId(payload.id);
		return payload;
	}
}
