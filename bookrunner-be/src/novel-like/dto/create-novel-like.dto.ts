import { Novel } from "src/novels/entities/novel.entity";
import { User } from "src/users/entities/user.entity";

export class CreateNovelLikeDto {
    novel: Novel;
    user: User;
}
