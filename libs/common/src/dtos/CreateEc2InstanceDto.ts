import { IsString, IsInt, IsIn } from 'class-validator'

const Region = ['us-east-1']

// todo: add more instanceType here
const InstanceType = ['t1.micro']

export class CreateEc2InstanceDto {
  @IsString()
    idolUrl: string

  @IsInt()
    viewAmount: number

  @IsString()
    imageId: string

  @IsIn(Region)
    instanceType: string

  @IsIn(InstanceType)
    region: string
}
