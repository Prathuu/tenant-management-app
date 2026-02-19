export interface JwtUser {
  userId: number;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'TENANT';
}
