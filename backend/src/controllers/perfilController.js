import { Buffer } from "buffer";
import fs from "fs-extra";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function atualizarPerfil(req, res) {
  try {
    const userId = req.usuario.id;
    const { nome, contato, foto } = req.body;
    const db = req.app.get("db");

    if (!userId) return res.status(401).json({ message: "Não autorizado" });

    // Pega o perfil atual para, se necessário, apagar a foto antiga
    const perfilAtual = await new Promise((resolve, reject) => {
      db.get("SELECT foto FROM perfil WHERE userID = ?", [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    let caminhoFoto = null;

    if (foto === null) {
      // Apaga foto antiga do disco se existir
      if (perfilAtual && perfilAtual.foto) {
        const caminhoAntigo = path.join(__dirname, "../../uploads", path.basename(perfilAtual.foto));
        fs.unlink(caminhoAntigo).catch((err) => console.log("Erro ao excluir foto antiga:", err));
      }
      caminhoFoto = null;
    } else if (foto && foto.startsWith("data:image")) {
      const matches = foto.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
      if (!matches) return res.status(400).json({ message: "Imagem inválida" });

      const ext = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, "base64");

      const uploadDir = path.join(__dirname, "../../uploads");
      await fs.ensureDir(uploadDir);

      const nomeArquivo = `user_${userId}.${ext}`;
      const caminhoCompleto = path.join(uploadDir, nomeArquivo);

      // Apaga foto antiga antes de salvar nova
      if (perfilAtual && perfilAtual.foto) {
        const caminhoAntigo = path.join(__dirname, "../../uploads", path.basename(perfilAtual.foto));
        await fs.unlink(caminhoAntigo).catch(() => {});
      }

      await fs.writeFile(caminhoCompleto, buffer);
      caminhoFoto = `/uploads/${nomeArquivo}`;
    } else {
      // Se foto não foi alterada, mantém a atual
      caminhoFoto = perfilAtual ? perfilAtual.foto : null;
    }

    // Atualiza no banco
    const sql =
      "UPDATE perfil SET nome = ?, contato = ?, foto = ? WHERE userID = ?";
    db.run(sql, [nome, contato, caminhoFoto, userId], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro no banco" });
      }
      return res.json({ message: "Perfil atualizado com sucesso", caminhoFoto });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
}

export async function criarPerfil(req, res) {
  try {
    const userId = req.usuario.id;
    const { nome, contato, foto } = req.body;
    const db = req.app.get("db");

    if (!userId) return res.status(401).json({ message: "Não autorizado" });

    // Salva a foto (mesma lógica que em atualizarPerfil)
    let caminhoFoto = null;
    if (foto && foto.startsWith("data:image")) {
      const matches = foto.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
      if (!matches) return res.status(400).json({ message: "Imagem inválida" });

      const ext = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, "base64");

      const uploadDir = path.join(__dirname, "../../uploads");
      await fs.ensureDir(uploadDir);

      const nomeArquivo = `user_${userId}.${ext}`;
      const caminhoCompleto = path.join(uploadDir, nomeArquivo);

      await fs.writeFile(caminhoCompleto, buffer);
      caminhoFoto = `/uploads/${nomeArquivo}`;
    }

    // Insere no banco
    const sql = `INSERT INTO perfil (userID, nome, contato, foto) VALUES (?, ?, ?, ?)`;
    db.run(sql, [userId, nome, contato, caminhoFoto], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar perfil" });
      }
      return res.status(201).json({ message: "Perfil criado com sucesso", caminhoFoto });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}


export function obterPerfil(req, res) {
  const userId = req.usuario.id;
  if (!userId) return res.status(401).json({ message: "Não autorizado" });

  const db = req.app.get("db");
  const sql = "SELECT * FROM perfil WHERE userID = ?";
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no banco" });
    }
    if (!row) return res.status(404).json({ message: "Perfil não encontrado" });

    res.json(row);
  });
}
