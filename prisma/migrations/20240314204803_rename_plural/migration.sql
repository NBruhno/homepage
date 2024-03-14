/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameUserData" DROP CONSTRAINT "GameUserData_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameUserData" DROP CONSTRAINT "GameUserData_ownerId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Games" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" "GameCategory",
    "cover" TEXT,
    "developers" JSONB,
    "dlcs" JSONB,
    "engines" JSONB,
    "franchises" JSONB,
    "genres" JSONB,
    "hype" INTEGER DEFAULT 0,
    "modes" JSONB,
    "multiplayerModes" JSONB,
    "parentId" INTEGER,
    "platforms" JSONB,
    "playerPerspectives" JSONB,
    "porters" JSONB,
    "publishers" JSONB,
    "rating" INTEGER,
    "ratingCount" INTEGER,
    "releaseDate" TIMESTAMP(3),
    "releaseDates" JSONB,
    "screenshot" TEXT,
    "similarGames" JSONB,
    "status" "GameStatus",
    "storyline" TEXT,
    "summary" TEXT,
    "supporters" JSONB,
    "themes" JSONB,
    "videos" JSONB,
    "websites" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastCheckedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "steamId" TEXT,
    "twoFactorSecret" CHAR(64),
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_id_key" ON "Games"("id");

-- CreateIndex
CREATE INDEX "Games_name_idx" ON "Games"("name");

-- CreateIndex
CREATE INDEX "Games_releaseDate_idx" ON "Games"("releaseDate");

-- CreateIndex
CREATE INDEX "Games_lastCheckedAt_idx" ON "Games"("lastCheckedAt" ASC);

-- CreateIndex
CREATE INDEX "Games_releaseDate_lastCheckedAt_hype_idx" ON "Games"("releaseDate", "lastCheckedAt" ASC, "hype" DESC);

-- CreateIndex
CREATE INDEX "Games_releaseDate_hype_idx" ON "Games"("releaseDate", "hype" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "GameUserData" ADD CONSTRAINT "GameUserData_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GameUserData" ADD CONSTRAINT "GameUserData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
