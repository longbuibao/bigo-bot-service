-- CreateEnum
CREATE TYPE "IdolStatus" AS ENUM ('LIVE', 'CHILL');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('BUSY', 'FREE');

-- CreateEnum
CREATE TYPE "InstanceStateName" AS ENUM ('PENDING', 'RUNNING', 'SHUTTING_DOWN', 'STOPPED', 'STOPPING', 'TERMINATED');

-- CreateTable
CREATE TABLE "Idol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "IdolStatus" NOT NULL,

    CONSTRAINT "Idol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ec2Instance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idolId" TEXT NOT NULL,
    "awsId" TEXT NOT NULL,
    "instanseState" "InstanceStateName" NOT NULL,

    CONSTRAINT "Ec2Instance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL,
    "ec2InstanceId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ec2Instance" ADD CONSTRAINT "Ec2Instance_idolId_fkey" FOREIGN KEY ("idolId") REFERENCES "Idol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_ec2InstanceId_fkey" FOREIGN KEY ("ec2InstanceId") REFERENCES "Ec2Instance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
