import { Test, TestingModule } from '@nestjs/testing';
import { BookVoteController } from './book-vote.controller';
import { BookVoteService } from './book-vote.service';

describe('BookVoteController', () => {
  let controller: BookVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookVoteController],
      providers: [BookVoteService],
    }).compile();

    controller = module.get<BookVoteController>(BookVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
