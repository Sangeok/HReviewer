-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('SUMMARY', 'FULL_REVIEW');

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "reviewType" "ReviewType" NOT NULL DEFAULT 'FULL_REVIEW';
