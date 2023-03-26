import { Injectable } from '@nestjs/common'

@Injectable()
export class BotGatewaySerivce {
  getHello (): string {
    return 'Hello World!'
  }
}
