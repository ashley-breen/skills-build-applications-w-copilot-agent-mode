import { useEffect, useState } from 'react'
import { collectionFrom } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(activitiesEndpoint).then((response) => {
      if (!response.ok) throw new Error('Could not load activities')
      return response.json()
    }).then((payload) => setActivities(collectionFrom(payload))).catch((reason) => setError(reason.message))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count-badge">{activities.length} logged</span></div>
      {error && <p className="status error">{error}</p>}
      {!error && activities.length === 0 && <p className="status">No activities recorded yet.</p>}
      <div className="data-grid">
        {activities.map((activity) => <article className="data-card" key={activity._id || activity.id}><div><h2>{activity.type || 'Activity'}</h2><p>{activity.userId?.name || activity.userId?.username || 'Unknown athlete'}</p></div><strong>{activity.points || 0} pts</strong><small>{activity.duration || 0} min</small></article>)}
      </div>
    </section>
  )
}

export default Activities