import { Controller } from '@nestjs/common'
import { Ec2Service } from './ec2.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ListUsersCommandOutput } from '@aws-sdk/client-iam'
import { RunInstancesCommandOutput } from '@aws-sdk/client-ec2'

import { CreateEc2InstanceDto } from '@bigo-bot/common/dtos/CreateEc2InstanceDto'
import { GET_IAM_USERS, CREATE_EC2_INSTANCE } from '@bigo-bot/common/command'

@Controller()
export class Ec2Controller {
  constructor (private readonly ec2Service: Ec2Service) {}

  @MessagePattern({ cmd: GET_IAM_USERS })
  async getIamUsers (): Promise<ListUsersCommandOutput> {
    return await this.ec2Service.getIamUsers()
  }

  @MessagePattern({ cmd: CREATE_EC2_INSTANCE })
  async createEc2Instances (@Payload() createEc2InstanceDto: CreateEc2InstanceDto): Promise<RunInstancesCommandOutput> {
    return await this.ec2Service.createEc2Instances(createEc2InstanceDto)
  }
}
