import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Ec2Module } from './ec2Module/ec2.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Ec2Module,
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
