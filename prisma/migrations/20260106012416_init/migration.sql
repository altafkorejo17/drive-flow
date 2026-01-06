/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `lesson_type` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LessonTypeName" AS ENUM ('THEORY', 'PRACTICAL', 'ROAD_TEST', 'PARKING_TEST', 'ASSESSMENT_TEST');

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "paymentStatus",
ADD COLUMN     "lesson_type" "LessonTypeName" NOT NULL,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';
