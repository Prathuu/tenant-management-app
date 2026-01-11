-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "hasLift" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ownerEmail" TEXT,
ADD COLUMN     "ownerName" TEXT,
ADD COLUMN     "ownerPhone" TEXT,
ADD COLUMN     "parkingSlots" INTEGER,
ADD COLUMN     "powerBackup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "securityAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waterSource" TEXT,
ADD COLUMN     "yearBuilt" INTEGER;
