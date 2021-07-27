import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

// カスタムパイプ : PipeTransformインターフェースを実装する必要
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // value: 現在処理しているメソッドの引数
  // metadata: メソッド引数のメタデータ
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 処理中の引数がJavaScriptのtypeの場合スキップ
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}