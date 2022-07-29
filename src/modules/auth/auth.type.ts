export interface JwtPayload {
  email: string;
}

export interface AuthConfig {
  ENV: string;
  DEV: boolean;
  SECRET_KEY: string;
  EXPIRES_IN: string;
  REFRESH_SECRET_KEY: string;
  REFRESH_EXPIRES_IN: string;
}

export interface AuthInfo {
  accessToken: string;
  refreshToken: string;
}
