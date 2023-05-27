export interface CreateEc2InstanceResult {
  // only need these information, use Instance interface from '@aws-sdk/client-ec2'
  InstanceId?: string
  State?: {
    Code?: number
    Name?: string
  }
}
