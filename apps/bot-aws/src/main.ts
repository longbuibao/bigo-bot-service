import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { BotAwsModule } from './botAws.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BotAwsModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379
      }
    }
  )
  await app.listen()
}
bootstrap().catch((error: any) => { console.log(error) })
