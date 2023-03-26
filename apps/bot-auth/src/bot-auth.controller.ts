import { Controller, Get } from '@nestjs/common'
import { BotAuthService } from './bot-auth.service'

@Controller()
export class BotAuthController {
  constructor (private readonly botAuthService: BotAuthService) {}

  @Get()
  getHello (): string {
    return this.botAuthService.getHello()
  }
}
