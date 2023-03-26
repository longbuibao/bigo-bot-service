import { Controller } from '@nestjs/common'
import { BotAwsService } from './bot-aws.service'
import { Ctx, MessagePattern, Payload, RedisContext } from '@nestjs/microservices'
import { ListUsersCommandOutput } from '@aws-sdk/client-iam'
import { RunInstancesCommandOutput } from '@aws-sdk/client-ec2'

@Controller()
export class BotAwsServiceController {
  constructor (private readonly botAwsService: BotAwsService) {}

  @MessagePattern({ cmd: 'get_iam_users' })
  async getIamUsers (@Payload() data: string, @Ctx() context: RedisContext): Promise<ListUsersCommandOutput> {
    return await this.botAwsService.getIamUsers(data, context)
  }

  @MessagePattern({ cmd: 'create_ec2_instance' })
  async createEc2Instances (@Payload() args: any, @Ctx() context: RedisContext): Promise<RunInstancesCommandOutput> {
    return await this.botAwsService.createEc2Instances(args, context)
  }
}
