import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService {
  prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async onModuleDestroy (): Promise<void> {
    await this.prisma.$disconnect()
  }
}
