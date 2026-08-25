import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message))
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