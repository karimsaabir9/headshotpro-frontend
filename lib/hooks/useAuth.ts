import { useMutation } from "@tanstack/react-query";
import { RegisterInput } from "@/lib/types";
import { authService } from "@/lib/services";

export const authKeys = {
  all: ["auth"] as const,
};

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
  });
}

export function useVerifyemail() {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => authService.resendVerification(email),
  });
}
