import { Test, TestingModule } from '@nestjs/testing';
import { CabinetsService } from './cabinets.service';

describe('CabinetsService', () => {
  let service: CabinetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CabinetsService],
    }).compile();

    service = module.get<CabinetsService>(CabinetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
