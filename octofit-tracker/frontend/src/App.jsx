import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return <section className="home-view"><p className="eyebrow">Your training, in focus</p><h1>Make today<br /><em>count.</em></h1><p className="home-copy">Track the work. Find your pace. Move together.</p><NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">-&gt;</span></NavLink><div className="home-stats"><span><strong>01</strong><small>Log your effort</small></span><span><strong>02</strong><small>Build your crew</small></span><span><strong>03</strong><small>Own your progress</small></span></div></section>
}

function App() {
  return <div className="app-shell"><header className="app-header"><NavLink className="brand" to="/"><img src="/octofitapp-small.png" alt="" /><span>OctoFit<small>TRACKER</small></span></NavLink><nav aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.to}>{item.label}</NavLink>)}</nav></header><main><Routes><Route path="/" element={<Home />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Home />} /></Routes></main><footer><span>OCTOFIT / 2026</span><span>Train consistently. Recover completely.</span></footer></div>
}

export default App
