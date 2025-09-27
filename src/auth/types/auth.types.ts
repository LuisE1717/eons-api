// auth.types.ts
export interface LoginSuccessResponse {
  refreshToken: string;
  accessToken: string;
  email: string;
  type: string;
  valid: boolean;
  essence: number;
  verified: boolean;
  requiresVerification?: boolean;
}

export interface VerificationRequiredResponse {
  requiresVerification: boolean;
  message: string;
  email: string;
  verified: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  requiresVerification: boolean;
  email: string;
  userExists: boolean;
}

export type LoginResponse = LoginSuccessResponse | VerificationRequiredResponse;