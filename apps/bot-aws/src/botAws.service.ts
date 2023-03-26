import { Injectable } from '@nestjs/common'
import { IAMClient, ListUsersCommand, ListUsersCommandOutput, ListUsersCommandInput } from '@aws-sdk/client-iam'
import { RunInstancesCommand, EC2Client, RunInstancesCommandOutput, RunInstancesCommandInput } from '@aws-sdk/client-ec2'

import { CreateEc2InstanceDto } from '@bigo-bot/common/dtos/CreateEc2InstanceDto'

@Injectable()
export class BotAwsService {
  async getIamUsers (): Promise<ListUsersCommandOutput> {
    const client = new IAMClient({ region: 'us-east-1', apiVersion: '2010-05-08' })
    const listUsersRequest = new ListUsersCommand({})
    return await client.send<ListUsersCommandInput, ListUsersCommandOutput>(listUsersRequest)
  }

  async createEc2Instances (payload: CreateEc2InstanceDto): Promise<RunInstancesCommandOutput> {
    const { maxCount, minCount, region, imageId, instanceType } = payload

    const client = new EC2Client({ region })
    const command = new RunInstancesCommand({
      MaxCount: maxCount | 1,
      ImageId: imageId,
      MinCount: minCount | 1,
      InstanceType: instanceType
    })

    return await client.send<RunInstancesCommandInput, RunInstancesCommandOutput>(command)
  }
}
