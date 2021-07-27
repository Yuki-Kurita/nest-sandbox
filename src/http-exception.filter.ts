import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
// 例外レイヤーを制御するために例外フィルターを使える、@Catchの引数に例外クラスを指定
@Catch(HttpException)
// ExceptionFilterインターフェースを実装する必要
export class HttpExceptionFilter implements ExceptionFilter {
  // exception: 現在処理中の例外オブジェクト
  // ArgumentHost: 全てのコンテキストを取得可能
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 例外に捕捉されなかったHttpExceptionのレスポンスを指定できる
    response.status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
    })
  }
}