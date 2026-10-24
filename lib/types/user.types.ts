export type UserRole = "admin" | "user";



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
