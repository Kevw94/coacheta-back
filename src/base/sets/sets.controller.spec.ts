import { Test, TestingModule } from '@nestjs/testing';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { ObjectId, WithId } from 'mongodb';
import { Response } from 'express';
import { SetsDeleteDto } from './dto/sets.dto';
import { Set } from './interfaces/sets.interface';
import { TrainingsModule } from '@/trainings/trainings.module';
import { DatabaseModule } from '@/external-modules/database/mongo.module';
import { forwardRef } from '@nestjs/common';

jest.mock('./sets.service'); // Mock the SetsService

describe('SetsController', () => {
  let controller: SetsController;
  let setsService: SetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetsController],
      imports: [
        DatabaseModule,
        forwardRef(() => TrainingsModule),
      ],
      providers: [SetsService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<SetsController>(SetsController);
    setsService = module.get<SetsService>(SetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSet', () => {
    it('should create a set', async () => {
      const userId = new ObjectId();
      const set: Set = {
        creator_id: '6634d54ac73d7a5b1e1f3dd0',
        exercise_id: '6648b9f8535f1686ec821cba',
        targets: { weight: 80, reps: 6 },
        results: null,
        isDone: false,
        training_id: '667c18786bc67a04a6fe6ed0',
      };
      const response = {
        set: { ...set, _id: new ObjectId() },
        training: {
          _id: new ObjectId(),
          session_id: 'sessionId',
          date: new Date(),
          sets_id: [],
          participants: [],
          isDone: false,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(setsService, 'createSets').mockResolvedValue(response);

      await controller.createSet(userId, set, res);

      expect(setsService.createSets).toHaveBeenCalledWith(set);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'ok', set: response.set, training: response.training });
    });
  });

  describe('deleteSet', () => {
    it('should delete a set', async () => {
      const userId = new ObjectId();
      const body: SetsDeleteDto = { _id: new ObjectId().toHexString() };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(setsService, 'deleteSet').mockResolvedValue(undefined);

      await controller.deleteSet(userId, body, res);

      expect(setsService.deleteSet).toHaveBeenCalledWith(body._id);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'ok' });
    });
  });

  describe('patchSets', () => {
    it('should patch a set', async () => {
      const userId = new ObjectId();
      const set: Set = {
        creator_id: '6634d54ac73d7a5b1e1f3dd0',
        exercise_id: '6648b9f8535f1686ec821cba',
        targets: { weight: 80, reps: 6 },
        results: null,
        isDone: false,
        training_id: '667c18786bc67a04a6fe6ed0',
      };
      const response = { ...set, _id: new ObjectId() };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(setsService, 'patchSet').mockResolvedValue(response);

      await controller.patchSets(userId, set, res);

      expect(setsService.patchSet).toHaveBeenCalledWith(set);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'ok', setUpdate: response });
    });
  });

  describe('getSetByTrainingId', () => {
    it('should get sets by trainingId', async () => {
      const userId = new ObjectId();
      const trainingId = new ObjectId().toHexString();
      const response: WithId<Set>[] = [{
        _id: new ObjectId(),
        creator_id: '6634d54ac73d7a5b1e1f3dd0',
        exercise_id: '6648b9f8535f1686ec821cba',
        targets: { weight: 80, reps: 6 },
        results: null,
        isDone: false,
        training_id: '667c18786bc67a04a6fe6ed0',
      }];
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(setsService, 'getSetByTainingId').mockResolvedValue(response);

      await controller.getSetByTraininngId(userId, trainingId, res);

      expect(setsService.getSetByTainingId).toHaveBeenCalledWith(userId, trainingId);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'ok', sets: response });
    });
  });
});
