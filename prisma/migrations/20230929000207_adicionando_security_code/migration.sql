/*
  Warnings:

  - Added the required column `securityCode` to the `Lock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lock` ADD COLUMN `securityCode` VARCHAR(191) NOT NULL;
