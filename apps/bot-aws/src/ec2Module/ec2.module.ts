import { Module } from '@nestjs/common'

import { Ec2Controller } from './ec2.controller'
import { Ec2Service } from './ec2.service'
import { PrismaService } from '@bigo-bot/common/prisma/prisma.service'

@Module({
  controllers: [Ec2Controller],
  providers: [Ec2Service, PrismaService]
})
export class Ec2Module {}
