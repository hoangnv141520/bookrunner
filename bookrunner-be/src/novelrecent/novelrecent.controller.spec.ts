import { Test, TestingModule } from '@nestjs/testing';
import { NovelrecentController } from './novelrecent.controller';
import { NovelrecentService } from './novelrecent.service';

describe('NovelrecentController', () => {
  let controller: NovelrecentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovelrecentController],
      providers: [NovelrecentService],
    }).compile();

    controller = module.get<NovelrecentController>(NovelrecentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
