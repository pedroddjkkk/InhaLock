/*
  Warnings:

  - The primary key for the `lock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `lock` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `temporarylockkey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `temporarylockkey` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `lock_id` on the `temporarylockkey` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `temporarylockkey` DROP FOREIGN KEY `TemporaryLockKey_lock_id_fkey`;

-- AlterTable
ALTER TABLE `lock` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `temporarylockkey` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `lock_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `TemporaryLockKey` ADD CONSTRAINT `TemporaryLockKey_lock_id_fkey` FOREIGN KEY (`lock_id`) REFERENCES `Lock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
