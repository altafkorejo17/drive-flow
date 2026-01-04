-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'MANAGER', 'ADMIN', 'INSTRUCTOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "LessonTypeName" AS ENUM ('THEORY', 'PRACTICAL', 'TEST');

-- CreateEnum
CREATE TYPE "VehicleTypeName" AS ENUM ('LMV', 'HMV', 'MOTORCYCLE', 'BUS');

-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('LIGHT_VEHICLE', 'MOTORCYCLE', 'HEAVY_VEHICLE', 'COMBINED', 'ALL_CATEGORIES');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(100),
    "emirates_id" VARCHAR(20),
    "password" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trade_license" TEXT NOT NULL,
    "trade_license_expiry" TIMESTAMP(3) NOT NULL,
    "school_type" "SchoolType" NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "SchoolStatus" NOT NULL DEFAULT 'ACTIVE',
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "license_no" TEXT NOT NULL,
    "license_expiry_date" TIMESTAMP(3) NOT NULL,
    "experience" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "grade" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_schools" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor_schools" (
    "id" TEXT NOT NULL,
    "instructor_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instructor_schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_schools" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_instructors" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "instructor_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_instructors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_emirates_id_key" ON "users"("emirates_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "schools_trade_license_key" ON "schools"("trade_license");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_user_id_key" ON "instructors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_schools_user_id_school_id_key" ON "user_schools"("user_id", "school_id");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_schools_instructor_id_school_id_key" ON "instructor_schools"("instructor_id", "school_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_schools_student_id_school_id_key" ON "student_schools"("student_id", "school_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_instructors_student_id_instructor_id_key" ON "student_instructors"("student_id", "instructor_id");

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schools" ADD CONSTRAINT "user_schools_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schools" ADD CONSTRAINT "user_schools_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_schools" ADD CONSTRAINT "instructor_schools_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_schools" ADD CONSTRAINT "instructor_schools_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_schools" ADD CONSTRAINT "student_schools_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_schools" ADD CONSTRAINT "student_schools_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_instructors" ADD CONSTRAINT "student_instructors_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_instructors" ADD CONSTRAINT "student_instructors_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
