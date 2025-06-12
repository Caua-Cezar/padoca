import axios from "axios";

const API_URL = "http://192.168.104.34:3333";

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  return res.json();
}

export async function register(email: string, senha: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, senha });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Erro axios:", error.response?.data);
      return { message: error.response?.data?.message || "Erro no registro" };
    }
    console.log("Erro desconhecido:", error);
    return { message: "Erro desconhecido no registro" };
  }
}


export async function criarPerfil(token: string, nome: string, contato: string, foto: string) {
  const res = await fetch(`${API_URL}/perfil/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nome, contato, foto }),
  });
  return res.json();
}

export async function meuPerfil(token: string) {
  const res = await fetch(`${API_URL}/perfil/meu-perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function atualizarPerfil(token: string, contato: string, foto: string) {
  const res = await fetch(`${API_URL}/perfil/atualizar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contato, foto }),
  });
  return res.json();
}
