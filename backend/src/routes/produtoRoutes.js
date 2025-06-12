import express from 'express';
import {
    atualizarProduto,
    criarProduto,
    deletarProduto,
    listarProdutos
} from '../controllers/produtoController.js';
import { authMiddleware, verificarAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('GET/produtos/', listarProdutos);
router.post('/criar', authMiddleware, verificarAdmin, criarProduto);
router.put('/atualizar/:id', authMiddleware, verificarAdmin, atualizarProduto);
router.delete('/deletar/:id', authMiddleware, verificarAdmin, deletarProduto);

export default router;
