import { Test, TestingModule } from '@nestjs/testing';
import { CabinetsController } from './cabinets.controller';

describe('Cabinets Controller', () => {
  let controller: CabinetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabinetsController],
    }).compile();

    controller = module.get<CabinetsController>(CabinetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
