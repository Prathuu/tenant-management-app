/*
  Warnings:

  - You are about to drop the column `graceDays` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `lateFee` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `lateFeePerDay` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `paidAmount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `depositPaid` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `depositRefunded` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `noticePeriodDays` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `securityDeposit` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Lease` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Tenant` table. All the data in the column will be lost.
  - Added the required column `leaseId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depositAmount` to the `Lease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Lease` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeaseStatus" AS ENUM ('ACTIVE', 'ENDED', 'TERMINATED');

-- DropForeignKey
ALTER TABLE "Lease" DROP CONSTRAINT "Lease_tenantId_fkey";

-- DropIndex
DROP INDEX "Invoice_tenantId_billingMonth_billingYear_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "graceDays",
DROP COLUMN "lateFee",
DROP COLUMN "lateFeePerDay",
DROP COLUMN "paidAmount",
ADD COLUMN     "leaseId" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "depositPaid",
DROP COLUMN "depositRefunded",
DROP COLUMN "noticePeriodDays",
DROP COLUMN "securityDeposit",
DROP COLUMN "tenantId",
ADD COLUMN     "depositAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "LeaseStatus" NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "isActive",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
