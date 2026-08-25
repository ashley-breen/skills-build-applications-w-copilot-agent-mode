import { useEffect, useState } from 'react'
import { collectionFrom } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetch(leaderboardEndpoint).then((response) => { if (!response.ok) throw new Error('Could not load leaderboard'); return response.json() }).then((payload) => setEntries(collectionFrom(payload))).catch((reason) => setError(reason.message)) }, [])

  return <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Earn your place</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} athletes</span></div>{error && <p className="status error">{error}</p>}<div className="leaderboard-list">{entries.map((entry, index) => <article className="leader-row" key={entry._id || entry.id}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><div><h2>{entry.userId?.name || entry.userId?.username || entry.name || 'Unknown athlete'}</h2><p>{entry.userId?.username ? `@${entry.userId.username}` : 'OctoFit member'}</p></div><strong>{entry.points || 0}<small> pts</small></strong></article>)}</div>{!error && entries.length === 0 && <p className="status">The leaderboard is waiting for its first score.</p>}</section>
}

export default Leaderboard