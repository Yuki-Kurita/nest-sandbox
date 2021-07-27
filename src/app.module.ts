import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from './application/app.service';
import { CatsModule } from './cats.module';
import { logger } from './middleware/logger.middleware';
import { AppController } from './presentation/app.controller';
import { CatsController } from './presentation/cats.controller';

// ルートモジュール
@Module({
  // 使うモジュールをインポートする
  imports: [CatsModule],
  // controllerの定義
  controllers: [AppController],
  // providerの定義(Injectされるクラス)
  providers: [AppService],
})
  // Middlewareを使う場合はNestModuleインターフェースを実装する必要
export class AppModule implements NestModule {
  // configureメソッドでMiddlewareを設定
  // MiddlewareConsumerでMiddlewareを管理するための組み込みメソッドを持つ
  configure(consumer: MiddlewareConsumer) {
    // applyでMiddlewareを使用、複数指定可能
    consumer.apply(logger)
      // excludeでルートを除くことができる
      .exclude({ path: "cats", method: RequestMethod.POST })
      // forRouteで特定のルートハンドラを設定
      .forRoutes(CatsController);
  }
}
