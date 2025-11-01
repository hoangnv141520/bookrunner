import { Test, TestingModule } from '@nestjs/testing';
import { NovelLikeController } from './novel-like.controller';
import { NovelLikeService } from './novel-like.service';

describe('NovelLikeController', () => {
  let controller: NovelLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovelLikeController],
      providers: [NovelLikeService],
    }).compile();

    controller = module.get<NovelLikeController>(NovelLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
