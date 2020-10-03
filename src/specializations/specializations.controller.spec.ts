import { Test, TestingModule } from '@nestjs/testing';
import { SpecializationsController } from './specializations.controller';

describe('Buildings Controller', () => {
  let controller: SpecializationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecializationsController],
    }).compile();

    controller = module.get<SpecializationsController>(SpecializationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
