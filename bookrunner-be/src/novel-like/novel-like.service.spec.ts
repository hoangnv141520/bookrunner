import { Test, TestingModule } from '@nestjs/testing';
import { NovelLikeService } from './novel-like.service';

describe('NovelLikeService', () => {
  let service: NovelLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NovelLikeService],
    }).compile();

    service = module.get<NovelLikeService>(NovelLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
