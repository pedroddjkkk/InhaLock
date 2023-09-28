-- DropForeignKey
ALTER TABLE `lock` DROP FOREIGN KEY `lock_user_id_fkey`;

-- AlterTable
ALTER TABLE `lock` ADD COLUMN `status` ENUM('ABERTO', 'FECHADO', 'CONECTADO', 'DESCONECTADO') NOT NULL DEFAULT 'DESCONECTADO';

-- AddForeignKey
ALTER TABLE `Lock` ADD CONSTRAINT `Lock_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `lock` RENAME INDEX `lock_id_key` TO `Lock_id_key`;
