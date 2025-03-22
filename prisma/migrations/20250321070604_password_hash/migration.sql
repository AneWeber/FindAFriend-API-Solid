/*
  Warnings:

  - You are about to drop the column `password` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;
