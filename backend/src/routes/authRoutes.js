import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // para gerar token aleatório
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/db.js';

const router = express.Router();
const SECRET = "padoca123"; // depois mova para .env

// Rota de login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ message: 'Senha incorreta' });

    if (!user.liberacao) return res.status(403).json({ message: 'Usuário bloqueado' });

    const token = jwt.sign(
      { id: user.id, tipoUsuario: user.tipoUsuario },
      SECRET,
      { expiresIn: 86400 }
    );

    res.json({ token, tipoUsuario: user.tipoUsuario });
  });
});

// Rota para solicitar recuperação de senha
router.post('/esqueci-senha', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email obrigatório' });

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Erro no banco' });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000).toISOString();

    db.run(
      `UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE email = ?`,
      [token, expires, email],
      (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao salvar token' });

        // Em produção, envie o token por email em vez de retornar
        res.json({ message: 'Token de redefinição enviado ao email (simulado)', token });
      }
    );
  });
});

// Rota para redefinir a senha com token
router.post('/redefinir-senha', async (req, res) => {
  const { token, senha } = req.body;
  if (!token || !senha) return res.status(400).json({ message: 'Token e senha são obrigatórios' });

  db.get(`SELECT * FROM usuarios WHERE reset_token = ?`, [token], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Erro no banco' });
    if (!user) return res.status(400).json({ message: 'Token inválido' });

    if (!user.reset_expires || new Date(user.reset_expires) < new Date()) {
      return res.status(400).json({ message: 'Token expirado' });
    }

    const hash = await bcrypt.hash(senha, 8);
    db.run(
      `UPDATE usuarios SET senha = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?`,
      [hash, user.id],
      (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar senha' });
        res.json({ message: 'Senha redefinida com sucesso' });
      }
    );
  });
});

// Rota de registro (cadastro)
router.post('/register', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ message: 'Email e senha são obrigatórios' });

  db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Erro no banco' });
    if (user) return res.status(400).json({ message: 'Usuário já existe' });

    try {
      const hash = await bcrypt.hash(senha, 8);
      db.run(
        'INSERT INTO usuarios (email, senha, liberacao, tipoUsuario) VALUES (?, ?, ?, ?)',
        [email, hash, 1, 'usuario'],
        function (err) {
          if (err) return res.status(500).json({ message: 'Erro ao criar usuário' });

          const token = jwt.sign({ id: this.lastID, tipoUsuario: 'usuario' }, SECRET, { expiresIn: 86400 });
          res.json({ token });
        }
      );
    } catch {
      res.status(500).json({ message: 'Erro ao processar senha' });
    }
  });
});

export default router;
