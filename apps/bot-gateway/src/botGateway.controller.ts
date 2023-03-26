import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import {
  ClientProxyFactory,
  ClientProxy,
  Transport
} from '@nestjs/microservices'
import { Observable, map } from 'rxjs'

import { CreateEc2Instance } from './dtos/CreateEc2Instance'

@Controller()
export class BotGatewayController {
  constructor (@Inject('BOT_SERVICE') private readonly client: ClientProxy) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379
      }
    })
  }

  @Get('iam-users')
  getIAmUser (): Observable<any> {
    return this.client.send({ cmd: 'get_iam_users' }, '').pipe(map(data => data))
  }

  @Post('create-ec2-instance')
  createEc2Instance (@Body() createEc2Instance: CreateEc2Instance): Observable<any> {
    return this.client.send({ cmd: 'create_ec2_instance' }, createEc2Instance).pipe(map(data => data))
  }
}
