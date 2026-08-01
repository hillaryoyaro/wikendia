/**
 * ============================================================================
 * Auth Feature Types
 * ============================================================================
 */

export type AuthErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  token?: string[];
  currentPassword?: string[];
  newPassword?: string[];
};


/**
 * ============================================================================
 * Server Action Response
 * ============================================================================
 */

export type AuthActionResponse = {
  success: boolean;

  message?: string;

  errors: AuthErrors;
};



/**
 * ============================================================================
 * Register Action State
 * ============================================================================
 */

export type RegisterState = AuthActionResponse;



/**
 * ============================================================================
 * Login Action State
 * ============================================================================
 */

export type LoginState = AuthActionResponse & {
  redirectTo?: string;
};



/**
 * ============================================================================
 * Password Reset State
 * ============================================================================
 */

export type ResetPasswordState = AuthActionResponse;



/**
 * ============================================================================
 * User Types
 * ============================================================================
 */

export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
};



/**
 * ============================================================================
 * OAuth Providers
 * ============================================================================
 */

export type OAuthProvider =
  | "google"
  | "github"
  | "facebook";



/**
 * ============================================================================
 * Auth Form Mode
 * ============================================================================
 */

export type AuthMode =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password";



/**
 * ============================================================================
 * Password Strength
 * ============================================================================
 */

export type PasswordStrength =
  | "weak"
  | "medium"
  | "strong";



/**
 * ============================================================================
 * Auth Error Codes
 * ============================================================================
 */

export type AuthErrorCode =
  | "INVALID_INPUT"
  | "USER_EXISTS"
  | "USER_NOT_FOUND"
  | "INVALID_PASSWORD"
  | "UNAUTHORIZED"
  | "TOKEN_EXPIRED"
  | "UNKNOWN";