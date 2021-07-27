import { HttpException, HttpStatus } from "@nestjs/common";

// カスタム例外
export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}