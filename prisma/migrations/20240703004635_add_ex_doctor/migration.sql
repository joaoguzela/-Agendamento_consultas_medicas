/*
  Warnings:

  - Added the required column `office_hour_end` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `office_hour_start` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "office_hour_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "office_hour_start" TIMESTAMP(3) NOT NULL;
