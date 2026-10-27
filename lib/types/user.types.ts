export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  _id: string;
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  credits: number;
  isEmailVerified: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
