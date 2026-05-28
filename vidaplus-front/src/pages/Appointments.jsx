import { useEffect, useState } from 'react'
import api from '../services/api.js'

function Appointments() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ doctor: '', specialty: '', date: '', notes: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const response = await api.get('/appointments')
      setItems(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      if (editingId) {
        await api.put(`/appointments/${editingId}`, form)
      } else {
        await api.post('/appointments', form)
      }
      setForm({ doctor: '', specialty: '', date: '', notes: '' })
      setEditingId(null)
      await load()
    } catch (err) {
      console.error(err)
    }
  }

  function handleEdit(item) {
    setEditingId(item.id)
    setForm({
      doctor: item.doctor,
      specialty: item.specialty,
      date: new Date(item.date).toISOString().slice(0, 16),
      notes: item.notes || ''
    })
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/appointments/${id}`)
      await load()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="section-page">
      <h1>Consultas</h1>
      <div className="grid-two">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Editar consulta' : 'Nova consulta'}</h2>
          <label>
            Médico
            <input name="doctor" value={form.doctor} onChange={handleChange} required />
          </label>
          <label>
            Especialidade
            <input name="specialty" value={form.specialty} onChange={handleChange} required />
          </label>
          <label>
            Data
            <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            Notas
            <textarea name="notes" value={form.notes} onChange={handleChange} />
          </label>
          <button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</button>
        </form>
        <div className="card list-card">
          <h2>Minhas consultas</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : items.length === 0 ? (
            <p>Sem consultas cadastradas.</p>
          ) : (
            <div className="list-group">
              {items.map((item) => (
                <div key={item.id} className="list-item">
                  <div>
                    <strong>{item.doctor}</strong>
                    <span>{item.specialty}</span>
                    <p>{new Date(item.date).toLocaleString()}</p>
                    {item.notes && <small>{item.notes}</small>}
                  </div>
                  <div className="actions">
                    <button type="button" onClick={() => handleEdit(item)}>Editar</button>
                    <button type="button" className="danger" onClick={() => handleDelete(item.id)}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
