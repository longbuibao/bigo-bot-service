import { NestFactory } from '@nestjs/core'
import { BotGatewayModule } from './bot-gateway.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(BotGatewayModule)
  await app.listen(3000)
}
bootstrap().catch(() => {})
