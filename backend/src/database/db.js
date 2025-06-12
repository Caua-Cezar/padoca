import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./src/database/database.db');

function colunaExiste(tabela, coluna, callback) {
  db.all(`PRAGMA table_info(${tabela});`, (err, rows) => {
    if (err) return callback(err, null);
    const nomesColunas = rows.map(row => row.name);
    callback(null, nomesColunas.includes(coluna));
  });
}

db.serialize(() => {
  // Criação das tabelas
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipoUsuario TEXT DEFAULT 'comum', 
      email TEXT UNIQUE,
      senha TEXT,
      mudaSenha INTEGER DEFAULT 0,
      liberacao INTEGER DEFAULT 1
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS perfil (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userID INTEGER,
      nome TEXT,
      contato TEXT,
      foto TEXT,
      FOREIGN KEY(userID) REFERENCES usuarios(id)
    );
  `);

  // Adiciona colunas se necessário
  colunaExiste('usuarios', 'reset_token', (err, existe) => {
    if (!existe) {
      db.run(`ALTER TABLE usuarios ADD COLUMN reset_token TEXT;`);
    }
  });

  colunaExiste('usuarios', 'reset_expires', (err, existe) => {
    if (!existe) {
      db.run(`ALTER TABLE usuarios ADD COLUMN reset_expires TEXT;`);
    }
  });

  // 🔐 Inserção automática do admin se não existir
  db.get(`SELECT * FROM usuarios WHERE email = 'admin@exemplo.com'`, (err, row) => {
    if (err) {
      console.error("Erro ao verificar admin:", err);
    } else if (!row) {
      db.run(`
        INSERT INTO usuarios (email, senha, tipoUsuario, liberacao)
        VALUES (
          'admin@exemplo.com',
          '$2b$08$GhoHYlJvr0rARfc.Z0p7IeC5bR6xIik6Z0FknSnL9bQQJ1tvUuRxy',
          'admin',
          1
        );
      `, (err) => {
        if (err) {
          console.error("Erro ao inserir admin:", err);
        } else {
          console.log("Usuário admin inserido com sucesso!");
        }
      });
    } else {
      console.log("Usuário admin já existe.");
    }
  });
});

export default db;
