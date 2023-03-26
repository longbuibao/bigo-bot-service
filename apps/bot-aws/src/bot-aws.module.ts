import { Module } from '@nestjs/common'

import { BotAwsServiceController } from './bot-aws.controller'
import { BotAwsService } from './bot-aws.service'

@Module({
  controllers: [BotAwsServiceController],
  providers: [BotAwsService]
})
export class BotAwsModule {}
