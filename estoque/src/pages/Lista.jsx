import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Lista() {
  const [itens, setItens] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/itens', { credentials: 'include' })
      .then(res => res.json())
      .then(setItens)
  }, [])

  return (
    <div>
      <h1 className="text-center mb-6 text-2xl font-bold">Itens em Estoque</h1>
      <table className="w-full border-collapse mt-5">
        <thead className="bg-[#0571F5] text-white">
          <tr>
            <th className="px-4 py-3 border-b border-[#7D7D7D]">Nome</th>
            <th className="px-4 py-3 border-b border-[#7D7D7D]">Categoria</th>
            <th className="px-4 py-3 border-b border-[#7D7D7D]">Qtd</th>
            <th className="px-4 py-3 border-b border-[#7D7D7D]">Preço</th>
            <th className="px-4 py-3 border-b border-[#7D7D7D]">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(i => (
            <tr key={i.id} className="even:bg-[#E3DCE3] hover:bg-[#04A8F4] hover:text-white">
              <td className="px-4 py-3 border-b border-[#7D7D7D]">{i.nome}</td>
              <td className="px-4 py-3 border-b border-[#7D7D7D]">{i.categoria}</td>
              <td className="px-4 py-3 border-b border-[#7D7D7D]">{i.quantidade}</td>
              <td className="px-4 py-3 border-b border-[#7D7D7D]">R$ {i.preco.toFixed(2)}</td>
              <td className="px-4 py-3 border-b border-[#7D7D7D]">
                <Link to={`/editar/${i.id}`} className="text-blue-700 hover:underline">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
