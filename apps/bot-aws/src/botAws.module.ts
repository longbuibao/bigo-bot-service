import { Module } from '@nestjs/common'

import { BotAwsServiceController } from './botAws.controller'
import { BotAwsService } from './botAws.service'

@Module({
  controllers: [BotAwsServiceController],
  providers: [BotAwsService]
})
export class BotAwsModule {}
