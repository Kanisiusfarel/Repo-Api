/*
  Warnings:

  - Added the required column `total_price` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projectevents"."Transactions" ADD COLUMN     "total_price" INTEGER NOT NULL;
