import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NovoUsuario() {
  const [form, setForm] = useState({ nickname:'', nome:'', senha:'' })
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Enviando:", form)  // debug pra ver os dados

    fetch('http://localhost:5000/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.result) {
        alert("Usuário criado com sucesso!")
        navigate('/login')
      } else {
        alert(data.error || "Erro ao criar usuário")
      }
    })
    .catch(err => console.error("Erro no fetch:", err))
  }

  return (
    <div>
      <h1 className="text-center mb-6 text-2xl font-bold">Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nickname','nome','senha'].map(f => (
          <div key={f}>
            <label className="block mb-2 font-bold capitalize">{f}</label>
            <input 
              type={f === 'senha' ? 'password' : 'text'}
              className="w-full px-3 py-2 border border-[#7D7D7D] rounded focus:outline-none focus:border-[#2004f4] focus:bg-[#E3DCE3]"
              value={form[f] || ''}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          </div>
        ))}
        <button 
          type="submit"
          className="px-5 py-2 rounded font-bold bg-[#0571F5] text-white hover:bg-[#0424f4]">
          Criar
        </button>
      </form>
    </div>
  )
}
