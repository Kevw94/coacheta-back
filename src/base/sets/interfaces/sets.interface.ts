import { ObjectId } from 'mongodb';

export type Set = {
	_id?: ObjectId;
	creator_id: ObjectId;
	exercise_id: ObjectId;
	training_id: ObjectId;
	targets: SetTargets;
	results: SetResults | null;
	isDone: boolean;
};

type SetTargets = {
	weight: number;
	reps: number;
};

type SetResults = {
	weight: number;
	reps: number;
	totalVolume: number;
	intensity: number;
};
