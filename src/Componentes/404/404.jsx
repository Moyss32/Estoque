import React from 'react';
import '404.css';

export default function Pagina404() {
  return (
    <div className="container-erro">
      <div className="caixa-erro">
        <h1 className="titulo-erro">Erro 404</h1>
        <p className="mensagem-erro">A página que você tentou acessar não foi encontrada.</p>
        <a href="/" className="botao-voltar">Voltar para o início</a>
      </div>
    </div>
  );
}