import { Injectable } from '@nestjs/common'
import { IAMClient, ListUsersCommand, ListUsersCommandOutput, ListUsersCommandInput } from '@aws-sdk/client-iam'
import {
  RunInstancesCommandOutput,
  RunInstancesCommand,
  EC2Client,
  RunInstancesCommandInput,
  waitUntilInstanceRunning,
  DescribeInstancesCommand
} from '@aws-sdk/client-ec2'

import { CreateEc2InstanceDto } from '@bigo-bot/common/dtos/CreateEc2InstanceDto'
import { countNumberOfInstanceBaseOnView } from '@bigo-bot/common/utils'

@Injectable()
export class Ec2Service {
  async getIamUsers (): Promise<ListUsersCommandOutput> {
    const client = new IAMClient({ region: 'us-east-1', apiVersion: '2010-05-08' })
    const listUsersRequest = new ListUsersCommand({})
    return await client.send<ListUsersCommandInput, ListUsersCommandOutput>(listUsersRequest)
  }

  async createEc2Instances (createEc2InstanceDto: CreateEc2InstanceDto): Promise<RunInstancesCommandOutput> {
    const client = new EC2Client({ region: createEc2InstanceDto.region })
    const numberOfInstance = countNumberOfInstanceBaseOnView(createEc2InstanceDto.viewAmount)

    // todo: some how pass the idol url and the bot accounts array
    const command = new RunInstancesCommand({
      ImageId: createEc2InstanceDto.imageId,
      InstanceType: createEc2InstanceDto.instanceType,
      MinCount: 1,
      MaxCount: numberOfInstance
    })

    const instances = await client.send<RunInstancesCommandInput, RunInstancesCommandOutput>(command)
    await this.sshToEc2Instance(instances, client)
    return instances
  }

  async sshToEc2Instance (instances: RunInstancesCommandOutput, ec2Client: EC2Client): Promise<void> {
    if (instances.Instances !== undefined) {
      const instanceIds = instances.Instances.map(instance => instance.InstanceId) as string[]
      await waitUntilInstanceRunning({ client: ec2Client, maxWaitTime: 600 }, { InstanceIds: instanceIds })
      const command = new DescribeInstancesCommand({})
      const response = await ec2Client.send(command)

      const instancesAfterWaitForItRunning = response.Reservations?.flatMap((reservation) => reservation.Instances) ?? []

      for (const instance of instancesAfterWaitForItRunning) {
        if (instance !== undefined) {
          const instanceId = instance.InstanceId ?? 'Unknown'
          const instanceStatus = instance.State?.Name ?? 'Unknown'

          console.log(`Instance ID: ${instanceId}, Status: ${instanceStatus}`)
        }
      }
    }
  }
}
