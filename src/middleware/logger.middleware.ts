// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { NextFunction, Request, Response } from "express";
// クラスのミドルウェア
// // ミドルウェアもDIする、NestMiddlewareを実装する必要
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log("Request...");
//     next();
//   }
// }

// 関数でのミドルウェア
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};