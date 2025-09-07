import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Novo() {
  const [form, setForm] = useState({ nome:'', categoria:'', quantidade:'', preco:'' })
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:5000/api/itens', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...form, quantidade: Number(form.quantidade), preco: Number(form.preco) })
    })
    .then(res => res.json())
    .then(() => navigate('/'))
  }

  return (
    <div>
      <h1 className="text-center mb-6 text-2xl font-bold">Novo Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nome','categoria','quantidade','preco'].map(f => (
          <div key={f}>
            <label className="block mb-2 font-bold capitalize">{f}</label>
            <input className="w-full px-3 py-2 border border-[#7D7D7D] rounded focus:outline-none focus:border-[#2004f4] focus:bg-[#E3DCE3]"
              value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} />
          </div>
        ))}
        <button className="px-5 py-2 rounded font-bold bg-[#0571F5] text-white hover:bg-[#0424f4]">Salvar</button>
      </form>
    </div>
  )
}
