-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('Released', 'Alpha', 'Beta', 'EarlyAccess', 'Offline', 'Cancelled', 'Rumored', 'Delisted');

-- CreateEnum
CREATE TYPE "GameCategory" AS ENUM ('MainGame', 'DLCAddon', 'Expansion', 'Bundle', 'StandaloneExpansion', 'Mod', 'Episode', 'Season', 'Remake', 'Remaster', 'ExpandedGame', 'Port', 'Fork');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "GameUserData" (
    "isFollowing" BOOLEAN NOT NULL DEFAULT false,
    "gameId" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameUserData_pkey" PRIMARY KEY ("gameId","ownerId")
);

-- CreateTable
CREATE TABLE "Game" (
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

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "steamId" TEXT,
    "twoFactorSecret" CHAR(64),
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameUserData_gameId_idx" ON "GameUserData"("gameId");

-- CreateIndex
CREATE INDEX "GameUserData_gameId_isFollowing_idx" ON "GameUserData"("gameId", "isFollowing");

-- CreateIndex
CREATE INDEX "GameUserData_ownerId_idx" ON "GameUserData"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE INDEX "Game_name_idx" ON "Game"("name");

-- CreateIndex
CREATE INDEX "Game_releaseDate_idx" ON "Game"("releaseDate");

-- CreateIndex
CREATE INDEX "Game_lastCheckedAt_idx" ON "Game"("lastCheckedAt" ASC);

-- CreateIndex
CREATE INDEX "Game_releaseDate_lastCheckedAt_hype_idx" ON "Game"("releaseDate", "lastCheckedAt" ASC, "hype" DESC);

-- CreateIndex
CREATE INDEX "Game_releaseDate_hype_idx" ON "Game"("releaseDate", "hype" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "GameUserData" ADD CONSTRAINT "GameUserData_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GameUserData" ADD CONSTRAINT "GameUserData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
