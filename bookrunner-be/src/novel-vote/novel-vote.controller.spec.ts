import { Test, TestingModule } from '@nestjs/testing';
import { NovelVoteController } from './novel-vote.controller';
import { NovelVoteService } from './novel-vote.service';

describe('NovelVoteController', () => {
  let controller: NovelVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovelVoteController],
      providers: [NovelVoteService],
    }).compile();

    controller = module.get<NovelVoteController>(NovelVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
