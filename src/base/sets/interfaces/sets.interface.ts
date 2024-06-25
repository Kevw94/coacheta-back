import { ObjectId } from 'mongodb';

export type Set = {
	_id?: ObjectId;
	creator_id: string;
	exercise_id: string;
	training_id: string;
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
