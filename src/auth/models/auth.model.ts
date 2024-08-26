export class LoginResponse {
  user: {
    name: string;
    email: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

// interface LoginResponse {
//   user: {
//     name: string;
//     email: string;
//   };
//   accessToken?: string;
//   refreshToken?: string;
// }