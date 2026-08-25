import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>{error && <p className="status error">{error}</p>}{!error && teams.length === 0 && <p className="status">No teams have been created yet.</p>}<div className="data-grid">{teams.map((team) => <article className="data-card team-card" key={team._id || team.id}><div><h2>{team.name || 'Unnamed team'}</h2><p>Ready to train together</p></div><strong>{team.members?.length || 0}</strong><small>members</small></article>)}</div></section>
}

export default Teams