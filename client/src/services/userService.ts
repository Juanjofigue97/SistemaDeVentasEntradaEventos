const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  identificacion: number;
  celular: number;
  is_admin: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/user/`);
  console.log(response);
  return await response.json();
};
