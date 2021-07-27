import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseFilters } from '@nestjs/common';
import { Cat, CatsService } from 'src/application/cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CreateCatDto } from './app.controller';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
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
  // pipeを使用する
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return `id: ${id}`;
  }
}
