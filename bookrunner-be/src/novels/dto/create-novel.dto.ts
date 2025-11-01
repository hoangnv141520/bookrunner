import { IsNotEmpty, IsString } from "class-validator";

export class CreateNovelDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    novel_desc: string;
}
