import { User, UserRole, UserStatus } from '@prisma/client';

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
  }

  static collection(users: UserOutput[]) {
    return users.map((user) => new AuthResource(user));
  }
}
