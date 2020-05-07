import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from './lessons.controller';

describe('Lessons Controller', () => {
  let controller: LessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
