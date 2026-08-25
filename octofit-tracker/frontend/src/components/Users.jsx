import { useEffect, useState } from 'react'
import { collectionFrom } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetch(usersEndpoint).then((response) => { if (!response.ok) throw new Error('Could not load users'); return response.json() }).then((payload) => setUsers(collectionFrom(payload))).catch((reason) => setError(reason.message)) }, [])
  return <section className="view-section"><div className="section-heading"><div><p className="eyebrow">The community</p><h1>Users</h1></div><span className="count-badge">{users.length} members</span></div>{error && <p className="status error">{error}</p>}{!error && users.length === 0 && <p className="status">No users found.</p>}<div className="data-grid">{users.map((user) => <article className="data-card" key={user._id || user.id}><div><h2>{user.name || user.username}</h2><p>@{user.username}</p></div><small>{user.email}</small></article>)}</div></section>
}

export default Users