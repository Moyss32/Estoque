import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ nickname:'', senha:'' })
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      credentials: 'include',
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.result) navigate('/')
      else alert(data.error)
    })
  }

  return (
    <div>
      <h1 className="text-center mb-6 text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-bold">Usuário</label>
          <input className="w-full px-3 py-2 border border-[#7D7D7D] rounded"
            value={form.nickname} onChange={e=>setForm({...form, nickname:e.target.value})} />
        </div>
        <div>
          <label className="block mb-2 font-bold">Senha</label>
          <input type="password" className="w-full px-3 py-2 border border-[#7D7D7D] rounded"
            value={form.senha} onChange={e=>setForm({...form, senha:e.target.value})} />
        </div>
        <button className="px-5 py-2 rounded font-bold bg-[#0571F5] text-white hover:bg-[#0424f4]">Entrar</button>
      </form>
    </div>
  )
}
