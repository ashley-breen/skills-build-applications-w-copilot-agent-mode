import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section className="view-section"><div className="section-heading"><div><p className="eyebrow">Train with intent</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>{error && <p className="status error">{error}</p>}{!error && workouts.length === 0 && <p className="status">No workouts available yet.</p>}<div className="data-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id || workout.id}><div><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for your next win.'}</p></div><span className="difficulty">{workout.difficulty || 'beginner'}</span><small>{workout.exercises?.length || 0} exercises</small></article>)}</div></section>
}

export default Workouts