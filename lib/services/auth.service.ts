import { api } from "../api";
import { RegisterInput, RegisterResponse, VerifyEmailResponse } from "../types";

export const authService = {
  //  register new user

  register: async (data: RegisterInput): Promise<RegisterResponse> => {
    return api.post<RegisterResponse>("/auth/register", data);
  },

  // verify email

  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    return api.get<VerifyEmailResponse>(`/auth/verify-email?token=${token}`);
  },
};
