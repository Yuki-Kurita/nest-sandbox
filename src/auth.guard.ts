import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

// GuardはCanActivateインターフェースを実装する必要がある
@Injectable()
export class AuthGuard implements CanActivate {
  // ExceptionContextを引数にとり、これから現在実行中の処理の詳細情報を取得できる
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // booleanを返し、認証を行う
    return true;
  }
}