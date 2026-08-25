import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])

  return <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Earn your place</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} athletes</span></div>{error && <p className="status error">{error}</p>}<div className="leaderboard-list">{entries.map((entry, index) => <article className="leader-row" key={entry._id || entry.id}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><div><h2>{entry.userId?.name || entry.userId?.username || entry.name || 'Unknown athlete'}</h2><p>{entry.userId?.username ? `@${entry.userId.username}` : 'OctoFit member'}</p></div><strong>{entry.points || 0}<small> pts</small></strong></article>)}</div>{!error && entries.length === 0 && <p className="status">The leaderboard is waiting for its first score.</p>}</section>
}

export default Leaderboard