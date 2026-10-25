import { User } from "./user.types";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  user: User;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}
