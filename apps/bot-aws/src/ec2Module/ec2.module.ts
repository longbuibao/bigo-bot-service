import { Module } from '@nestjs/common'

import { Ec2Controller } from './ec2.controller'
import { Ec2Service } from './ec2.service'
import { IdolsDbModule } from '@bigo-bot/common/idols-db/idols-db.module'

@Module({
  controllers: [Ec2Controller],
  providers: [Ec2Service],
  imports: [IdolsDbModule]
})
export class Ec2Module {}
