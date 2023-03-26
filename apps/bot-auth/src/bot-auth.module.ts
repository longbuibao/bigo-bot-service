import { Module } from '@nestjs/common'
import { BotAuthController } from './bot-auth.controller'
import { BotAuthService } from './bot-auth.service'

@Module({
  imports: [],
  controllers: [BotAuthController],
  providers: [BotAuthService]
})
export class BotAuthModule {}
