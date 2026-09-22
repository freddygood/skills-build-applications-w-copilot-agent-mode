import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const links = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Athletes'],
  ['/workouts', 'Workouts'],
]

export default function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container py-2">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
            <img src="/octofitapp-small.png" className="brand-mark" alt="" /> OctoFit
          </NavLink>
          <nav className="navbar-nav ms-auto flex-row gap-1 flex-wrap justify-content-end">
            {links.slice(1).map(([path, label]) => <NavLink key={path} className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`} to={path}>{label}</NavLink>)}
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="container pb-4 text-secondary small">OctoFit Tracker · Move more, together.</footer>
    </div>
  )
}

function Overview() {
  return (
    <section className="hero-panel p-4 p-md-5">
      <p className="eyebrow">Your fitness, amplified</p>
      <h1 className="display-4 fw-bold">Small steps.<br /><span>Big momentum.</span></h1>
      <p className="lead text-secondary col-lg-7">Log activities, find your team, and turn consistency into your next personal best.</p>
      <div className="d-flex gap-2 flex-wrap mt-4">
        <NavLink className="btn btn-primary btn-lg" to="/activities">Log activity</NavLink>
        <NavLink className="btn btn-outline-dark btn-lg" to="/workouts">Explore workouts</NavLink>
      </div>
    </section>
  )
}
