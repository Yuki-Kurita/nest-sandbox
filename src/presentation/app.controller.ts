import { Body, Controller, Get, Header, HttpCode, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from 'src/domain/create-cat.dto';
import { AppService } from '../application/app.service';

interface Greed {
  id: number;
  text: string;
}

interface GreedRequest {
  id: number;
}

// ルートごとのパスを指定できる
@Controller("api/v1")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    // プリミティブ型をreturnするとそのままの値が返る
    return this.appService.getHello();
  }

  // Getアノテーションにパスを指定できる
  @Get("/greed")
  // @Req()デコレータをつけることでリクエストオブジェクトにアクセスできる
  findGreedById(@Req() request: Request): Greed {
    console.log(`greed get request params: ${request.body}}`)
    // Objectを返すとJSONにシリアライズされる
    return {
      id: 1,
      text: "goob bye"
    }
  }

  // パターンベースのルートも使える
  // :idのようにコロンを使ってパスパラメータを定義する
  @Get("/ab*cd/:id")
  // statusCodeを変更できる
  @HttpCode(202)
  // @Param()デコレータをつけることでパスパラメータにアクセスできる
  wildTest(@Param("id") id: string): String {
    return `This path parameter : ${id}`
  }

  @Get("/docs")
  // リダイレクトデコレータでリダイレクトを実現、第二引数にステータスコード
  @Redirect("https://docs.nestjs.com", 302)
  // @Queryでくらりパラメータを取得できる
  getDocs(@Query("version") version: string) {
    console.log(`query : ${version}`);
    if (version && version === "5") {
      // url, statusCodeのオブジェクトを返すとリダイレクト先を上書ける
      return {
        url: "https://docs.nestjs.com/v5/"
      }
    }
  }

  @Post()
  // カスタムのレスポンスヘッダーを指定する
  @Header("Cache-Control", "none")
  // @Bodyでボディリクエストを受け付ける
  create(@Body() createCatDto: CreateCatDto) {
    console.log(`post request body: ${JSON.stringify(createCatDto)}`)
    return "created";
  }
}
