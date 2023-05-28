import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class IdolsDbService {
  private readonly prismaService: PrismaService

  constructor (prismaService: PrismaService) {
    this.prismaService = prismaService
  }

  async saveEc2Instance (ec2Ids: string[], idolUrl: string): Promise<boolean> {
    const instancesSaved = this.prismaService.prisma.ec2Instance.createMany({
      data: ec2Ids.map(ec2Id => {
        // todo create many instance first
        const ec2 = {} as Prisma.Ins
        ec2.awsId = ec2Id
        ec2.idolId = idolUrl
      }),
      skipDuplicates: true
    })
  }

  async saveIdolWithEc2Id (idolUrl: string, ec2Ids: string[]): Promise<boolean> {
    this.prismaService.prisma.idol.create({
      data: {
        url: idolUrl,
        ec2Instances: ec2Ids
      }
    })
  }
}
