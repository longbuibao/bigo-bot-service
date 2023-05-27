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
import { CreateEc2InstanceResult } from '@bigo-bot/common/types/CreateEc2InstanceResult'
import { bigoLog } from '@bigo-bot/common/log'

@Injectable()
export class Ec2Service {
  private readonly ec2Client: EC2Client
  constructor () {
    this.ec2Client = new EC2Client({ region: 'us-east-1' })
  }

  async spinUpEc2Bots (createEc2InstanceDto: CreateEc2InstanceDto): Promise<CreateEc2InstanceResult[]> {
    const response = await this.createInstance(createEc2InstanceDto)
    const instances = await this.getInstanceWithRunningState(response.Instances as Instance[])
    return instances.map((instance: Instance) => {
      const createResult: CreateEc2InstanceResult = {
        InstanceId: instance.InstanceId,
        State: {
          Code: instance.State?.Code ?? -9999,
          Name: instance.State?.Name ?? 'Undefined State Name'
        }
      }
      return createResult
    })
  }

  private async waitForInstanceHasRunningState (instances: Instance[]): Promise<WaiterState> {
    const instanceIds = instances.map(instance => instance.InstanceId) as string[]
    const waitResult = await waitUntilInstanceRunning({ client: this.ec2Client, maxWaitTime: 600 }, { InstanceIds: instanceIds })
    return waitResult.state
  }

  private async getInstanceWithRunningState (instances: Instance[]): Promise<Instance[]> {
    bigoLog('Waiting for EC2 instances with running state...')

    const state = await this.waitForInstanceHasRunningState(instances)
    if (state === WaiterState.SUCCESS) {
      const startTime = new Date()
      startTime.setMinutes(startTime.getMinutes() - 3)

      try {
        const stateFilter = {
          Name: 'instance-state-name',
          Values: ['running']
        }

        const command = new DescribeInstancesCommand({
          Filters: [stateFilter]
        })

        const response = (await this.ec2Client.send(command)).Reservations
        if (response !== undefined) {
          const instances = response.flatMap((reservation) => reservation.Instances) as Instance[]
          return instances
        }

        bigoLog('Done created instances')
      } catch (error) {
        console.error('Error:', error)
      }
    }
    bigoLog('Done created instances')
    return []
  }

  private async createInstance (createEc2InstanceDto: CreateEc2InstanceDto): Promise<RunInstancesCommandOutput> {
    const numberOfInstance = countNumberOfInstanceBaseOnView(createEc2InstanceDto.viewAmount)
    bigoLog(`Creating ${numberOfInstance} EC2 Instances with Idol ${createEc2InstanceDto.idolUrl}`)

    // todo: some how pass the idol url and the bot accounts array
    const command = new RunInstancesCommand({
      ImageId: createEc2InstanceDto.imageId,
      InstanceType: createEc2InstanceDto.instanceType,
      MinCount: 1,
      MaxCount: numberOfInstance
    })

    const response = await this.ec2Client.send<RunInstancesCommandInput, RunInstancesCommandOutput>(command)
    bigoLog(`Created ${numberOfInstance} instances!`)

    return response
  }
}
