import { Body, Controller, Inject, Post } from '@nestjs/common'
import {
  ClientProxyFactory,
  ClientProxy,
  Transport
} from '@nestjs/microservices'
import { Observable, map } from 'rxjs'
import { RunInstancesCommandOutput } from '@aws-sdk/client-ec2'

import { CreateEc2InstanceDto } from '@bigo-bot/common/dtos/CreateEc2InstanceDto'
import { CREATE_EC2_INSTANCE } from '@bigo-bot/common/command'

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

  @Post('create-ec2-instance')
  createEc2Instance (@Body() createEc2InstanceDto: CreateEc2InstanceDto): Observable<RunInstancesCommandOutput> {
    return this.client.send({ cmd: CREATE_EC2_INSTANCE }, createEc2InstanceDto).pipe(map<RunInstancesCommandOutput, any>(data => data))
  }
}
