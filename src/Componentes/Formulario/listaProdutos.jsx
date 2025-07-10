import React, { useState } from 'react';
import './listaProdutos.css';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [novoPreco, setNovoPreco] = useState('');

  const adicionarProduto = (e) => {
    e.preventDefault();

    if (!nome || preco === '') return;

    const precoFloat = parseFloat(preco);
    const quantidadeInt = parseInt(quantidade) || 1;
    const nomeUpper = nome.toUpperCase();

    setProdutos((produtosAnteriores) => {
      const produtoExistente = produtosAnteriores.find(
        (produto) => produto.nome === nomeUpper
      );

      if (produtoExistente) {
        return produtosAnteriores.map((produto) =>
          produto.nome === nomeUpper
            ? { ...produto, quantidade: produto.quantidade + quantidadeInt, preco: precoFloat }
            : produto
        );
      }

      const novoProduto = {
        id: Date.now(),
        nome: nomeUpper,
        preco: precoFloat,
        quantidade: quantidadeInt,
      };

      return [...produtosAnteriores, novoProduto];
    });

    setNome('');
    setPreco('');
    setQuantidade('');
  };

  const atualizarPreco = (nomeProduto, novoPreco) => {
    setProdutos((produtosAnteriores) =>
      produtosAnteriores.map((produto) =>
        produto.nome === nomeProduto.toUpperCase() ? { ...produto, preco: parseFloat(novoPreco) } : produto
      )
    );
  };

  const verificarEstoque = (produto) => {
    if (produto.quantidade <= 5) {
      return (
        <span className="alerta">ACABANDO! (+50 pedidos)</span>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <h1>Quantidade no estoque</h1>
      <form onSubmit={adicionarProduto} className="formulario">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value.toUpperCase())}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul className="lista">
        {produtos.map((produto) => (
          <li key={produto.id} className="produto">
            <span className="nome">{produto.nome}</span>
            <span className="preco">R$ {produto.preco.toFixed(2)}</span>
            <span className="quantidade">Quantidade: {produto.quantidade}</span>
            {verificarEstoque(produto)}
            <input
              type="number"
              placeholder="Novo Preço"
              value={novoPreco}
              onChange={(e) => setNovoPreco(e.target.value)}
            />
            <button onClick={() => atualizarPreco(produto.nome, novoPreco)}>Atualizar Preço</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
