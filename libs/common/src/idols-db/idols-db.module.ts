import { Module } from '@nestjs/common'
import { IdolsDbService } from './idols-db.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  providers: [IdolsDbService, PrismaService],
  exports: [IdolsDbService]
})
export class IdolsDbModule {}
