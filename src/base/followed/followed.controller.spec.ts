import { Test, TestingModule } from '@nestjs/testing';
import { FollowedController } from './followed.controller';

describe('FollowedController', () => {
  let controller: FollowedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowedController],
    }).compile();

    controller = module.get<FollowedController>(FollowedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
