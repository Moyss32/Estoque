import { useState } from 'react';
import './App.css';
import Pagina404 from './Componentes/404/404.jsx'; // Corrigido o caminho
import ProductList from './Componentes/Formulario/listaProdutos.jsx'; // Corrigido o caminho
import Suporte from './Componentes/suporte/pagSuport.jsx'; // Corrigido o caminho e o nome do arquivo

function App() {
  return (
    <div className="App">
      <button href="#suporte">Para suporte clique aqui</button> {/* Corrigido para #suporte */}
      <ProductList />
    </div>
  );
}

export default App;