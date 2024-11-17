/*
  Warnings:

  - You are about to drop the column `venue` on the `Events` table. All the data in the column will be lost.
  - Added the required column `category` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projectevents"."Events" DROP COLUMN "venue",
ADD COLUMN     "category" TEXT NOT NULL;
