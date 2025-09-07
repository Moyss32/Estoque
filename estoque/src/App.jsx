import { Routes, Route, Link } from 'react-router-dom'
import Lista from './pages/Lista'
import Novo from './pages/Novo'
import Editar from './pages/Editar'
import Login from './pages/Login'
import NovoUsuario from './pages/NovoUsuario'

export default function App() {
  return (
    <div>
      <header className="flex justify-center items-center py-5 bg-[#0571F5] text-white">
        <nav className="flex gap-5">
          <Link to="/" className="font-bold hover:text-[#0408f4]">Lista</Link>
          <Link to="/novo" className="font-bold hover:text-[#0408f4]">Novo</Link>
          <Link to="/login" className="font-bold hover:text-[#0408f4]">Login</Link>
          <Link to="/novo-usuario" className="font-bold hover:text-[#0408f4]">Novo Usuário</Link>
        </nav>
      </header>

      <main className="max-w-[960px] mx-auto my-10 bg-white p-8 shadow-md rounded-lg">
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/novo" element={<Novo />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/novo-usuario" element={<NovoUsuario />} />
        </Routes>
      </main>
    </div>
  )
}
