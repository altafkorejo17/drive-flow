// src/auth/resources/instructor.resource.ts
import { Instructor } from '@prisma/client';

export class InstructorResource {
  license_no: string;
  license_expiry_date: Date;
  experience: number;
  created_at: Date;

  constructor(instructor: Instructor) {
    this.license_no = instructor.licenseNo;
    this.license_expiry_date = instructor.licenseExpiryDate;
    this.experience = instructor.experience;
    this.created_at = instructor.createdAt;
  }
}
