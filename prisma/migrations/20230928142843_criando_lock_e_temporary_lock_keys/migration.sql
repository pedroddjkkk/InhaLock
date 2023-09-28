-- CreateTable
CREATE TABLE `lock` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `lock_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemporaryLockKey` (
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `lock_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TemporaryLockKey_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lock` ADD CONSTRAINT `lock_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemporaryLockKey` ADD CONSTRAINT `TemporaryLockKey_lock_id_fkey` FOREIGN KEY (`lock_id`) REFERENCES `lock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
