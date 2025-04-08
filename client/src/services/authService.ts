import {jwtDecode} from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

interface DecodedToken {
  sub: string;
  exp: number;
  // Puedes agregar más si lo incluyes en el token (como role)
}

export const authenticateUser = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  token?: string;
  userId?: string;
  message?: string;
}> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || "Login failed",
      };
    }

    const token = data.access_token;

    // Guardar el token en localStorage
    localStorage.setItem("token", token);

    // Decodificar para obtener el ID
    const decoded: DecodedToken = jwtDecode(token);

    return {
      success: true,
      token,
      userId: decoded.sub, // ID del usuario
    };
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return {
      success: false,
      message: "Error de red o del servidor",
    };
  }
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  identificacion: number;
  celular: number;
  password: string;
  is_admin: boolean;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || "Error en el registro",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return {
      success: false,
      message: "Error de red o del servidor",
    };
  }
};