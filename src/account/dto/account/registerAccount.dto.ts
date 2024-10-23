export class RegisterAccountDto {
  userId?: number; // Nếu user đã tồn tại, gửi userId, nếu không có thì sẽ tạo mới user
  platformId: number; // Id của nền tảng (Gmail, Facebook, v.v.)
  username: string; // Email cho Gmail hoặc Username cho Facebook
  password: string; // Mật khẩu
  statusId: number; // Trạng thái của tài khoản (ví dụ: active, suspended)
  name?: string; // Tên của user, chỉ cần khi tạo mới user
}
