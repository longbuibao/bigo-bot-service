import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { BotGatewayController } from './botGateway.controller'
import { BotGatewayService } from './botGateway.service'

@Module({
  imports: [
    ClientsModule.register(
      [
        {
          name: 'BOT_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost', port: 6379
          }
        }
      ]
    )
  ],
  controllers: [BotGatewayController],
  providers: [BotGatewayService]
})
export class BotGatewayModule {}
