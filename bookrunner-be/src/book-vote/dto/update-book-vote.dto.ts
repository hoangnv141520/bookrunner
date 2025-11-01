import { PartialType } from '@nestjs/mapped-types';
import { CreateBookVoteDto } from './create-book-vote.dto';

export class UpdateBookVoteDto extends PartialType(CreateBookVoteDto) {}
