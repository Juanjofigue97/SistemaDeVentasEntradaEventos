export type UserRole = 'admin' | 'usuario';

export interface User {
  email: string;
  password: string;
  role: UserRole;
}

export const users: User[] = [
  {
    email: "juanjo.figue97@gmail.com",
    password: "123",
    role: "admin",
  },
  {
    email: "usuario@eventia.com",
    password: "user123",
    role: "usuario",
  },
];
