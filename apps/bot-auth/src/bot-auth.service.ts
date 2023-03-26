import { Injectable } from '@nestjs/common'

@Injectable()
export class BotAuthService {
  getHello (): string {
    return 'Hello World!'
  }
}
