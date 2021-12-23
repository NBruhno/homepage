-- CreateTable
CREATE TABLE `GameUserData` (
    `isFollowing` BOOLEAN NOT NULL DEFAULT false,
    `gameId` INTEGER NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GameUserData_isFollowing_gameId_ownerId_idx`(`isFollowing`, `gameId`, `ownerId`),
    PRIMARY KEY (`gameId`, `ownerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('MainGame', 'DLCAddon', 'Expansion', 'Bundle', 'StandaloneExpansion', 'Mod', 'Episode', 'Season', 'Remake', 'Remaster', 'ExpandedGame', 'Port', 'Fork') NULL,
    `cover` VARCHAR(191) NULL,
    `developers` JSON NULL,
    `dlcs` JSON NULL,
    `engines` JSON NULL,
    `franchises` JSON NULL,
    `genres` JSON NULL,
    `hype` INTEGER NULL DEFAULT 0,
    `modes` JSON NULL,
    `multiplayerModes` JSON NULL,
    `parentId` INTEGER NULL,
    `platforms` JSON NULL,
    `playerPerspectives` JSON NULL,
    `porters` JSON NULL,
    `publishers` JSON NULL,
    `rating` INTEGER NULL,
    `ratingCount` INTEGER NULL,
    `releaseDate` DATETIME(3) NULL,
    `releaseDates` JSON NULL,
    `screenshot` VARCHAR(191) NULL,
    `similarGames` JSON NULL,
    `status` ENUM('Released', 'Alpha', 'Beta', 'EarlyAccess', 'Offline', 'Cancelled', 'Rumored', 'Delisted') NULL,
    `storyline` TEXT NULL,
    `summary` TEXT NULL,
    `supporters` JSON NULL,
    `themes` JSON NULL,
    `videos` JSON NULL,
    `websites` JSON NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastChecked` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Game_id_key`(`id`),
    INDEX `Game_name_idx`(`name`),
    INDEX `Game_releaseDate_idx`(`releaseDate`),
    INDEX `Game_releaseDate_hype_idx`(`releaseDate`, `hype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
    `twoFactorSecret` CHAR(64) NULL,
    `username` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
