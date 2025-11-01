import { PartialType } from '@nestjs/mapped-types';
import { CreateNovelrecentDto } from './create-novelrecent.dto';

export class UpdateNovelrecentDto extends PartialType(CreateNovelrecentDto) {}
