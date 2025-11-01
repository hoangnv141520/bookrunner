import { PartialType } from '@nestjs/mapped-types';
import { CreateNovelVoteDto } from './create-novel-vote.dto';

export class UpdateNovelVoteDto extends PartialType(CreateNovelVoteDto) {}
