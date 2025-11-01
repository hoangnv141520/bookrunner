import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDetailDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    @IsNotEmpty()
    @IsNumber()
    bookId: number;
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
