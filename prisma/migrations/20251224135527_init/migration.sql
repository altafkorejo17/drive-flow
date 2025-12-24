/*
  Warnings:

  - You are about to drop the column `licenseNumber` on the `institutes` table. All the data in the column will be lost.
  - The `status` column on the `institutes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `instituteId` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the column `licenseExpiry` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNumber` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the column `emiratesId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `instituteId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `students` table. All the data in the column will be lost.
  - The `status` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `instituteId` on the `user_institutes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_institutes` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - The `status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[user_id]` on the table `instructors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emirates_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,institute_id]` on the table `user_institutes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,role_id]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `license_number` to the `institutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_id` to the `instructors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_expiry` to the `instructors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_number` to the `instructors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `instructors` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `specialization` on the `instructors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `emirates_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_id` to the `user_institutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_institutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "institute_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "student_status" AS ENUM ('ACTIVE', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "specialization" AS ENUM ('THEORY', 'PRACTICAL', 'BOTH');

-- DropForeignKey
ALTER TABLE "instructors" DROP CONSTRAINT "instructors_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "instructors" DROP CONSTRAINT "instructors_userId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_institutes" DROP CONSTRAINT "user_institutes_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "user_institutes" DROP CONSTRAINT "user_institutes_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- DropIndex
DROP INDEX "instructors_userId_key";

-- DropIndex
DROP INDEX "students_emiratesId_key";

-- DropIndex
DROP INDEX "students_userId_key";

-- DropIndex
DROP INDEX "user_institutes_userId_instituteId_key";

-- DropIndex
DROP INDEX "user_roles_userId_roleId_key";

-- AlterTable
ALTER TABLE "institutes" DROP COLUMN "licenseNumber",
ADD COLUMN     "license_number" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "institute_status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "instructors" DROP COLUMN "instituteId",
DROP COLUMN "licenseExpiry",
DROP COLUMN "licenseNumber",
DROP COLUMN "userId",
ADD COLUMN     "institute_id" INTEGER NOT NULL,
ADD COLUMN     "license_expiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "license_number" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "specialization",
ADD COLUMN     "specialization" "specialization" NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "emiratesId",
DROP COLUMN "instituteId",
DROP COLUMN "userId",
ADD COLUMN     "emirates_id" TEXT NOT NULL,
ADD COLUMN     "institute_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "student_status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "user_institutes" DROP COLUMN "instituteId",
DROP COLUMN "userId",
ADD COLUMN     "institute_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "passwordHash",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "user_status" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "InstituteStatus";

-- DropEnum
DROP TYPE "Specialization";

-- DropEnum
DROP TYPE "StudentStatus";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateIndex
CREATE UNIQUE INDEX "instructors_user_id_key" ON "instructors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_emirates_id_key" ON "students"("emirates_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_institutes_user_id_institute_id_key" ON "user_institutes"("user_id", "institute_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "user_roles"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_institutes" ADD CONSTRAINT "user_institutes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_institutes" ADD CONSTRAINT "user_institutes_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
