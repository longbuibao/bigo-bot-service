import { Injectable } from '@nestjs/common'

import { WaiterState } from '@aws-sdk/util-waiter'
import {
  RunInstancesCommandOutput,
  RunInstancesCommand,
  EC2Client,
  RunInstancesCommandInput,
  waitUntilInstanceRunning,
  DescribeInstancesCommand,
  Instance
} from '@aws-sdk/client-ec2'

import { CreateEc2InstanceDto } from '@bigo-bot/common/dtos/CreateEc2InstanceDto'
import { countNumberOfInstanceBaseOnView } from '@bigo-bot/common/utils'

@Injectable()
export class Ec2Service {
  async spinUpEc2Bots (createEc2InstanceDto: CreateEc2InstanceDto): Promise<Instance[]> {
    const client = new EC2Client({ region: createEc2InstanceDto.region })
    const numberOfInstance = countNumberOfInstanceBaseOnView(createEc2InstanceDto.viewAmount)

    // todo: some how pass the idol url and the bot accounts array
    const command = new RunInstancesCommand({
      ImageId: createEc2InstanceDto.imageId,
      InstanceType: createEc2InstanceDto.instanceType,
      MinCount: 1,
      MaxCount: numberOfInstance
    })

    const response = await client.send<RunInstancesCommandInput, RunInstancesCommandOutput>(command)
    const instances = await this.getInstanceWithRunningState(response.Instances as Instance[], client)
    return instances
  }

  async waitForInstanceHasRunningState (instances: Instance[], ec2Client: EC2Client): Promise<WaiterState> {
    const instanceIds = instances.map(instance => instance.InstanceId) as string[]
    const waitResult = await waitUntilInstanceRunning({ client: ec2Client, maxWaitTime: 600 }, { InstanceIds: instanceIds })
    return waitResult.state
  }

  async getInstanceWithRunningState (instances: Instance[], ec2Client: EC2Client): Promise<Instance[]> {
    const state = await this.waitForInstanceHasRunningState(instances, ec2Client)
    if (state === WaiterState.SUCCESS) {
      const startTime = new Date()
      startTime.setMinutes(startTime.getMinutes() - 3)

      try {
        const timeFilter = {
          Name: 'launch-time',
          Values: [
            startTime.toISOString(),
            new Date().toISOString()
          ]
        }

        const stateFilter = {
          Name: 'instance-state-name',
          Values: ['running']
        }

        const command = new DescribeInstancesCommand({
          Filters: [timeFilter, stateFilter]
        })

        const response = (await ec2Client.send(command)).Reservations
        if (response !== undefined) {
          const instances = response.flatMap((reservation) => reservation.Instances) as Instance[]
          return instances
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    return []
  }
}
