// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET = "padoca123"; // Ideal colocar no .env

// Middleware para verificar se o token JWT é válido
export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "Não autorizado" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; // Inclui todo o payload no req.usuario (pode conter id, tipoUsuario, etc.)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

// Middleware para verificar se o usuário é administrador
export function verificarAdmin(req, res, next) {
  if (req.usuario.tipoUsuario !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores' });
  }
  next();
}
