import { ObjectId } from 'mongodb';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


<<<<<<<< HEAD:src/base/exercises/entities/Exercise.entity.ts
export class ExerciseEntity {
========
export class ExerciceEntity {
>>>>>>>> 629b2ba (Implement exercises):src/base/exercices/entities/exercice.entity.ts
	@ApiProperty({
		type: ObjectId,
		example: "ObjectId('66267514b4cf851b4df7fadb')"
	})
	_id?: ObjectId;

	// @ApiProperty({
	// 	type: UserProfileEntity,
	// })
	// profile?: UserProfile;

	@ApiProperty({
		type: String,
		example: "chest"
	})
	bodyPart?: string;

	@ApiProperty({
		type: String,
		example: "body weight"
	})
	equipment?: string;

	@ApiProperty({
		type: String,
		example: "https://v2.exercisedb.io/image/Bi8xVYeWIyqo56"
	})
	gifUrl?: string;

	@ApiProperty({
		type: String,
		example: "3294"
	})
	id?: string;

	@ApiProperty({
		type: String,
		example: "archer push up"
	})
	name?: string;

	@ApiProperty({
		type: String,
		example: "pectorals"
	})
	target?: string;

	@ApiProperty({
		type: Array<String>,
		example: ["triceps", "shoulders", "core"]
	})
	secondaryMuscles?: Array<string>;

	@ApiProperty({
		type: Array<String>,
		example: [
			"Start in a push-up position with your hands slightly wider than shoulder-width apart.",
			"Extend one arm straight out to the side, parallel to the ground.",
			"Lower your body by bending your elbows, keeping your back straight and core engaged.",
			"Push back up to the starting position.",
			"Repeat on the other side, extending the opposite arm out to the side.",
			"Continue alternating sides for the desired number of repetitions."
		]
	})
	instructions?: Array<string>;
}
