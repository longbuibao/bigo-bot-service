import { Test, TestingModule } from '@nestjs/testing'
import { BotAuthController } from './bot-auth.controller'
import { BotAuthService } from './bot-auth.service'

describe('BotAuthController', () => {
  let botAuthController: BotAuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BotAuthController],
      providers: [BotAuthService]
    }).compile()

    botAuthController = app.get<BotAuthController>(BotAuthController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(botAuthController.getHello()).toBe('Hello World!')
    })
  })
})
