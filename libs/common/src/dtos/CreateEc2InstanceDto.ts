import { IsString, IsInt, IsIn, IsOptional } from 'class-validator'

const Region = ['us-east-1']
const InstanceType = ['t1.micro']

export class CreateEc2InstanceDto {
  @IsString()
    idolUrl: string

  @IsInt()
    viewAmount: number

  @IsInt()
  @IsOptional()
    maxCount: number

  @IsInt()
  @IsOptional()
    minCount: number

  @IsString()
    imageId: string

  @IsIn(Region)
    instanceType: string

  @IsIn(InstanceType)
    region: string
}
