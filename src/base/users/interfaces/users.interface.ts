import { ObjectId } from 'mongodb';

export enum Targets {
	PERTE_DE_POIDS = 0,
	PRISE_DE_MASSE = 1,
	PPRISE_DE_FORCE = 2,
}


export interface User {
	_id?: ObjectId;
	profile?: UserProfile;
	hashedPassword?: string;
	activation_token?: string;
	resetToken?: string;
	is_active?: boolean;
	created_at?: Date | string;
}

export interface UserProfile {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
	phone?: string;
	birthDate?: Date;
	picture?: string;
	size?: number;
	weight?: number;
	gender?: boolean;
	targets?: Array<Targets>
}


