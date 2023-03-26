import { Injectable } from '@nestjs/common'
import { RedisContext } from '@nestjs/microservices'
import { IAMClient, ListUsersCommand, ListUsersCommandOutput, ListUsersCommandInput } from '@aws-sdk/client-iam'
import { RunInstancesCommand, EC2Client, RunInstancesCommandOutput, RunInstancesCommandInput } from '@aws-sdk/client-ec2'

@Injectable()
export class BotAwsService {
  async getIamUsers (data: string, context: RedisContext): Promise<ListUsersCommandOutput> {
    const client = new IAMClient({ region: 'us-east-1', apiVersion: '2010-05-08' })
    const listUsersRequest = new ListUsersCommand({})
    return await client.send<ListUsersCommandInput, ListUsersCommandOutput>(listUsersRequest)
  }

  async createEc2Instances (args: any, context: RedisContext): Promise<RunInstancesCommandOutput> {
    const client = new EC2Client({ region: 'us-east-1' })
    const command = new RunInstancesCommand({
      MaxCount: 1,
      ImageId: 'ami-0ebabb8cf39198221',
      MinCount: 1,
      InstanceType: 't1.micro'
    })

    return await client.send<RunInstancesCommandInput, RunInstancesCommandOutput>(command)
  }
}
