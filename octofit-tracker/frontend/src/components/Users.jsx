import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <section className="view-section"><div className="section-heading"><div><p className="eyebrow">The community</p><h1>Users</h1></div><span className="count-badge">{users.length} members</span></div>{error && <p className="status error">{error}</p>}{!error && users.length === 0 && <p className="status">No users found.</p>}<div className="data-grid">{users.map((user) => <article className="data-card" key={user._id || user.id}><div><h2>{user.name || user.username}</h2><p>@{user.username}</p></div><small>{user.email}</small></article>)}</div></section>
}

export default Users