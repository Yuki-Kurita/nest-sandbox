import { IsInt, IsString } from "class-validator";

// クラスバリデーションを行う
export class CreateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}