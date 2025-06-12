import { Router } from "express";
import { atualizarPerfil, criarPerfil, obterPerfil } from "../controllers/perfilController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/criar", authMiddleware, criarPerfil); // ✅ aqui está a rota que falta
router.put("/atualizar", authMiddleware, atualizarPerfil);
router.get("/meu-perfil", authMiddleware, obterPerfil);

export default router;
