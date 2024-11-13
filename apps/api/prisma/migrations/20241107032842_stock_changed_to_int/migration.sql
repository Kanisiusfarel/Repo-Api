/*
  Warnings:

  - Changed the type of `stock` on the `Events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `quantity` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projectevents"."Events" DROP COLUMN "stock",
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "projectevents"."Transactions" ADD COLUMN     "quantity" INTEGER NOT NULL;
