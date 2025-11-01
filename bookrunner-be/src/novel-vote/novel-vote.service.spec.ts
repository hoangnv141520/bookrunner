import { Test, TestingModule } from '@nestjs/testing';
import { NovelVoteService } from './novel-vote.service';

describe('NovelVoteService', () => {
  let service: NovelVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NovelVoteService],
    }).compile();

    service = module.get<NovelVoteService>(NovelVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
