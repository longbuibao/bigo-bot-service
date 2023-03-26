import { Controller } from '@nestjs/common'
import { BotAwsService } from './botAws.service'
import { MessagePattern } from '@nestjs/microservices'
import { ListUsersCommandOutput } from '@aws-sdk/client-iam'
import { RunInstancesCommandOutput } from '@aws-sdk/client-ec2'

@Controller()
export class BotAwsServiceController {
  constructor (private readonly botAwsService: BotAwsService) {}

  @MessagePattern({ cmd: 'get_iam_users' })
  async getIamUsers (): Promise<ListUsersCommandOutput> {
    return await this.botAwsService.getIamUsers()
  }

  @MessagePattern({ cmd: 'create_ec2_instance' })
  async createEc2Instances (): Promise<RunInstancesCommandOutput> {
    return await this.botAwsService.createEc2Instances()
  }
}
