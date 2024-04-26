import { ObjectId } from 'mongodb';

export interface FitnessExercise {
	_id: ObjectId
	bodyPart: BodyPart
	equipment: Equipment
	gifURL: string
	id: string
	name: string
	target: Target
	secondaryMuscles: Array<string>
	instructions: Array<string>
}

export enum BodyPart {
	WAIST = "waist",
	CHEST = "chest",
	BACK = "back",
	CARDIO = "cardio",
	LOWER_ARMS = "lower arms",
	LOWER_LEGS = "lower legs",
	NECK = "neck",
	SHOULDERS = "shoulders",
	UPPER_ARMS = "upper arms",
	UPPER_LEGS = "upper legs"
}

export enum Equipment {
	ASSISTED = "assisted",
	BAND = "band",
	BARBELL = "barbell",
	BODY_WEIGHT = "body weight",
	BOSU_BALL = "bosu ball",
	CABLE = "cable",
	DUMBBELL = "dumbbell",
	ELLIPTICAL_MACHINE ="elliptical machine",
	EZ_BARBELL = "ez barbell",
	HAMMER = "hammer",
	KETTLEBELL = "kettlebell",
	LEVERAGE_MACHINE = "leverage machine",
	MEDICINE_BALL = "medicine ball",
	OLYMPIC_BARBELL = "olympic barbell",
	RESISTANCE_BAND = "resistance band",
	ROLLER = "roller",
	ROPE = "rope",
	SKIERG_MACHINE = "skierg machine",
	SLED_MACHINE = "sled machine",
	SMITH_MACHINE = "smith machine",
	STABILITY_BALL = "stability ball",
	STATIONARY_BIKE ="stationary bike",
	STEPMILL_MACHINE = "stepmill machine",
	TIRE = "tire",
	TRAP_BAR = "trap bar",
	UPPER_BODY_ERGOMETER = "upper body ergometer",
	WEIGHTED = "weighted",
	WHEEL_ROLLER ="wheel roller"
}

export enum Target {
	ABDUCTORS = "abductors",
	ABS = "abs",
	BICEPS ="biceps",
	CALVES = "calves",
	CARDIO = "cardiovascular system",
	DELTS = "delts",
	FOREARMS = "forearms",
	GLUTES = "glutes",
	HAMSTRINGS = "hamstrings",
	LATS = "lats",
	LEVATOR_SCAPULAE = "levator scapulae",
	PECTORALS = "pectorals",
	QUADS = "quads",
	SERRATUS_ANTERIOR = "serratus anterior",
	SPINE = "spine",
	TRAPS = "traps",
	TRICEPS = "triceps",
	UPPER_BACK = "upper back"
}