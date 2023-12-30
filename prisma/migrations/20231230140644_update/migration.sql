/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Note` table. All the data in the column will be lost.
  - Added the required column `title` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "expiresAt",
ADD COLUMN     "title" TEXT NOT NULL;
