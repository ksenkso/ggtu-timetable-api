import { Test, TestingModule } from '@nestjs/testing';
import { PatchesController } from './patches.controller';

describe('Patches Controller', () => {
  let controller: PatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatchesController],
    }).compile();

    controller = module.get<PatchesController>(PatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
