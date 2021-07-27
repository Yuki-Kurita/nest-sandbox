import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, SetMetadata, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { Cat, CatsService } from 'src/application/cats.service';
import { AuthGuard } from 'src/auth.guard';
import { CreateCatDto } from 'src/domain/create-cat.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
// パイプや例外フィルタと同様に、ガードもコントローラー、メソッド、グローバルスコープにすることができる
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // リクエストボディをバリデーションする場合などはメソッドレベルでパイプをバインドする
  // @UsePipes(new JoiValidationPipe(schema))
  // Postのリクエストボディに対してバリデーションする場合は@Bodyの引数にセット
  async create(@Body(new ValidationPipe) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get("error")
  // 例外フィルターをコントローラーに結びつける
  @UseFilters(HttpExceptionFilter)
  async throwError() {
    // HttpExceptionコンストラクタはレスポンスボディ、ステータスコードを引数にとる
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get(":id")
  // メソッドにメタデータを付与する
  @SetMetadata("roles", ["admin"])
  // pipeを使用する
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return `id: ${id}`;
  }
}
