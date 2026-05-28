import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './Layout.css'

function Layout() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('vidaplus_token')
    navigate('/login')
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">VidaPlus</div>
        <nav className="nav-links">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/appointments">Consultas</NavLink>
          <NavLink to="/medications">Medicamentos</NavLink>
        </nav>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
