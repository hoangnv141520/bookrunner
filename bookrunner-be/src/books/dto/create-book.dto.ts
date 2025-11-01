import { Author } from "src/authors/entities/author.entity";
import { Category } from "src/categories/entities/category.entity";

export class CreateBookDto {
    title: string;
    image: string;
    novel_desc: string;
    price: number;
    publisher: string;
    pages: number;
    releasedate: Date;
    categories: Category[];
    author: Author;
}
