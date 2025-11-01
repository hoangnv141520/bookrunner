import { PartialType } from '@nestjs/mapped-types';
import { CreateNovelLikeDto } from './create-novel-like.dto';

export class UpdateNovelLikeDto extends PartialType(CreateNovelLikeDto) {}
