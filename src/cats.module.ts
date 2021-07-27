import { Module } from "@nestjs/common";
import { CatsService } from "./application/cats.service";
import { CatsController } from "./presentation/cats.controller";

// 同じモジュールのセットをどこにでも使いたいときはモジュールをグローバルにする
// Globalにした場合はimportする必要がなくなる
// @Global()
// 同じ機能でモジュール化する
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // CatsServiceを他のモジュールでインスタンス共有したい場合、exportする
  exports: [CatsService]
})
export class CatsModule {}