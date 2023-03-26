import { Test, TestingModule } from '@nestjs/testing'
import { BotAwsServiceController } from './bot-aws.controller'
import { BotAwsService } from './bot-aws.service'

describe('AppController', () => {
  let botAwsController: BotAwsServiceController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BotAwsServiceController],
      providers: [BotAwsService]
    }).compile()

    botAwsController = app.get<BotAwsServiceController>(BotAwsServiceController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(botAwsController).toBeDefined()
    })
  })
})
