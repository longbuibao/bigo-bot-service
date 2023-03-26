import { NestFactory } from '@nestjs/core'
import { BotAuthModule } from './bot-auth.module'

async function bootstrap () {
  const app = await NestFactory.create(BotAuthModule)
  await app.listen(3000)
}
bootstrap()
