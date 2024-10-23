export interface LoginResponse {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}
