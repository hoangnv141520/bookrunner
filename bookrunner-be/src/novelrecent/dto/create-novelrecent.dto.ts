import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Novel } from "src/novels/entities/novel.entity";
import { User } from "src/users/entities/user.entity";

export class CreateNovelrecentDto {
    user: User;

    novel: Novel;

    @IsNotEmpty()
    @IsNumber()
    last_read_chapter_id: number;

    @IsNotEmpty()
    @IsString()
    last_read_chapter_name: string;
}
