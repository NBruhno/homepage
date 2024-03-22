/*
  Warnings:

  - You are about to drop the column `lastCheckedAt` on the `Games` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Games_lastCheckedAt_idx";

-- DropIndex
DROP INDEX "Games_releaseDate_lastCheckedAt_hype_idx";

-- AlterTable
ALTER TABLE "Games" DROP COLUMN "lastCheckedAt";
