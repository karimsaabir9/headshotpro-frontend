import { User } from "./user.types";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  user: User;
}
