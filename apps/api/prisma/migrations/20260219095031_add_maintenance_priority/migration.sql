/*
  Warnings:

  - Added the required column `priority` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MaintenancePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterEnum
ALTER TYPE "MaintenanceStatus" ADD VALUE 'CLOSED';

-- AlterTable
ALTER TABLE "MaintenanceRequest" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "priority" "MaintenancePriority" NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;
