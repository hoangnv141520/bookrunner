import { Test, TestingModule } from '@nestjs/testing';
import { NovelrecentService } from './novelrecent.service';

describe('NovelrecentService', () => {
  let service: NovelrecentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NovelrecentService],
    }).compile();

    service = module.get<NovelrecentService>(NovelrecentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
