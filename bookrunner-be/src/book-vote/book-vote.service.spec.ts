import { Test, TestingModule } from '@nestjs/testing';
import { BookVoteService } from './book-vote.service';

describe('BookVoteService', () => {
  let service: BookVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookVoteService],
    }).compile();

    service = module.get<BookVoteService>(BookVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
