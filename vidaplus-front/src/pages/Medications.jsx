import { useEffect, useState } from 'react'
import api from '../services/api.js'

function Medications() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', dosage: '', schedule: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const response = await api.get('/medications')
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
        await api.put(`/medications/${editingId}`, form)
      } else {
        await api.post('/medications', form)
      }
      setForm({ name: '', dosage: '', schedule: '' })
      setEditingId(null)
      await load()
    } catch (err) {
      console.error(err)
    }
  }

  function handleEdit(item) {
    setEditingId(item.id)
    setForm({ name: item.name, dosage: item.dosage || '', schedule: item.schedule || '' })
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/medications/${id}`)
      await load()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="section-page">
      <h1>Medicamentos</h1>
      <div className="grid-two">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Editar medicamento' : 'Novo medicamento'}</h2>
          <label>
            Nome
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Dosagem
            <input name="dosage" value={form.dosage} onChange={handleChange} />
          </label>
          <label>
            Horário
            <input name="schedule" value={form.schedule} onChange={handleChange} />
          </label>
          <button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</button>
        </form>
        <div className="card list-card">
          <h2>Meus medicamentos</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : items.length === 0 ? (
            <p>Sem medicamentos cadastrados.</p>
          ) : (
            <div className="list-group">
              {items.map((item) => (
                <div key={item.id} className="list-item">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.dosage}</span>
                    <p>{item.schedule}</p>
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

export default Medications
