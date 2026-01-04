import { Instructor, User, UserRole, UserStatus } from '@prisma/client';
import { InstructorResource } from './instructor/instructor.resource';

type UserOutput = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  emiratesId: string | null;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  instructor?: any;
};

export class AuthResource {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  emirates_id: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: Date;
  instructor?: InstructorResource;

  constructor(user: UserOutput) {
    this.id = user.id;
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.emirates_id = user.emiratesId;
    this.role = user.role;
    this.status = user.status;
    this.created_at = user.createdAt;
    if (user.instructor) {
      this.instructor = new InstructorResource(user.instructor);
    }
  }

  static collection(users: UserOutput[]) {
    return users.map((user) => new AuthResource(user));
  }
}
