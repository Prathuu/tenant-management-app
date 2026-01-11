/*
  Warnings:

  - The `status` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `waterSource` column on the `Building` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `relation` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tenantId,month,year]` on the table `Bill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[buildingId,code]` on the table `Floor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[floorId,roomNumber]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenantId,roomId,startDate]` on the table `TenantRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "WaterSource" AS ENUM ('MUNICIPAL', 'BOREWELL', 'BOTH');

-- CreateEnum
CREATE TYPE "PersonRelation" AS ENUM ('SELF', 'SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'OTHER');

-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID');

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "status",
ADD COLUMN     "status" "BillStatus" NOT NULL DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "Building" DROP COLUMN "waterSource",
ADD COLUMN     "waterSource" "WaterSource";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "relation",
ADD COLUMN     "relation" "PersonRelation";

-- CreateIndex
CREATE INDEX "Bill_tenantId_idx" ON "Bill"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_tenantId_month_year_key" ON "Bill"("tenantId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Floor_buildingId_code_key" ON "Floor"("buildingId", "code");

-- CreateIndex
CREATE INDEX "Payment_tenantId_idx" ON "Payment"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_floorId_roomNumber_key" ON "Room"("floorId", "roomNumber");

-- CreateIndex
CREATE INDEX "TenantRoom_tenantId_idx" ON "TenantRoom"("tenantId");

-- CreateIndex
CREATE INDEX "TenantRoom_roomId_idx" ON "TenantRoom"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "TenantRoom_tenantId_roomId_startDate_key" ON "TenantRoom"("tenantId", "roomId", "startDate");
