import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api.js'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', cep: '', street: '', neighborhood: '', city: '', state: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const cleaned = form.cep.replace(/\D/g, '')
    if (cleaned.length === 8) {
      fetchAddress(cleaned)
    }
  }, [form.cep])

  async function fetchAddress(cep) {
    try {
      const response = await api.get(`/users/address/${cep}`)
      setForm((prev) => ({ ...prev, ...response.data }))
    } catch (err) {
      console.warn('CEP não encontrado', err)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <label>
          Nome
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Senha
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          CEP
          <input name="cep" value={form.cep} onChange={handleChange} maxLength="9" />
        </label>
        <label>
          Rua
          <input name="street" value={form.street} onChange={handleChange} />
        </label>
        <label>
          Bairro
          <input name="neighborhood" value={form.neighborhood} onChange={handleChange} />
        </label>
        <label>
          Cidade
          <input name="city" value={form.city} onChange={handleChange} />
        </label>
        <label>
          Estado
          <input name="state" value={form.state} onChange={handleChange} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</button>
        <p className="form-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
