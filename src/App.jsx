import ProductList from "./Componentes/Formulario/listaProdutos";
import pagSuporte from "./Componentes/suporte/pagSuport.jsx";


function App() {
  return (
    <div className="App">
      <button href="<pagSuporte />">Para suporte clique aqui</button>
      <ProductList />
    </div>
  );
}

export default App;
