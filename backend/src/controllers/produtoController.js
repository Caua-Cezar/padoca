// Simulação de produtos com array (substitua com DB real)
let produtos = [];

export const listarProdutos = (req, res) => {
  res.json(produtos);
};

export const criarProduto = (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  produtos.push(novo);
  res.status(201).json(novo);
};

export const atualizarProduto = (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' });

  produtos[index] = { ...produtos[index], ...req.body };
  res.json(produtos[index]);
};

export const deletarProduto = (req, res) => {
  const { id } = req.params;
  produtos = produtos.filter(p => p.id != id);
  res.json({ message: 'Produto deletado' });
};
