import { useEffect, useState } from 'react'
import api from '../services/api.js'

function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [apRes, medRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/medications')
        ])
        setAppointments(apRes.data)
        setMedications(medRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const nextAppointment = appointments
    .filter((item) => new Date(item.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="dashboard-grid">
          <div className="card summary-card">
            <h3>Total de consultas</h3>
            <p>{appointments.length}</p>
          </div>
          <div className="card summary-card">
            <h3>Total de medicamentos</h3>
            <p>{medications.length}</p>
          </div>
          <div className="card summary-card">
            <h3>Próxima consulta</h3>
            {nextAppointment ? (
              <div>
                <strong>{nextAppointment.doctor}</strong>
                <p>{new Date(nextAppointment.date).toLocaleString()}</p>
              </div>
            ) : (
              <p>Sem consultas futuras</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
