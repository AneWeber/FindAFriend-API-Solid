/*
  Warnings:

  - You are about to drop the column `cep` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `zip` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `latitude` on the `orgs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `orgs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "cep",
ADD COLUMN     "zip" TEXT NOT NULL,
DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;
