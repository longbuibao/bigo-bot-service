import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import {
  ClientProxyFactory,
  ClientProxy,
  Transport
} from '@nestjs/microservices'
import { Observable, map } from 'rxjs'

import { CreateEc2InstanceDto } from '@bigo-bot/common/dtos/CreateEc2InstanceDto'

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
  createEc2Instance (@Body() createEc2Instance: CreateEc2InstanceDto): Observable<any> {
    return this.client.send({ cmd: 'create_ec2_instance' }, createEc2Instance).pipe(map(data => data))
  }
}
