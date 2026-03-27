/*
  Warnings:

  - Added the required column `occupancyType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OccupancyType" AS ENUM ('SINGLE', 'SHARED', 'FAMILY');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "occupancyType" "OccupancyType" NOT NULL;
