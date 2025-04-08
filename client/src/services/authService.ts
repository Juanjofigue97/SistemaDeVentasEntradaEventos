import { users, UserRole } from '../data/users';

export const authenticateUser = (
  email: string,
  password: string
): { success: boolean; role?: UserRole; message?: string } => {
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return {
      success: true,
      role: user.role,
    };
  }

  return {
    success: false,
    message: "Correo o contraseña incorrectos",
  };
};
