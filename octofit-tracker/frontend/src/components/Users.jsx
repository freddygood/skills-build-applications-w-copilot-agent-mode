import { useEffect, useState } from 'react'
import { fetchItems } from '../api'

export default function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems(endpoint).then(setUsers).catch((requestError) => setError(requestError.message))
  }, [endpoint])

  return (
    <section>
      <p className="eyebrow">Your community</p>
      <h1 className="display-6 mb-1">Athletes</h1>
      <p className="text-secondary mb-4">Meet the people powering the OctoFit community.</p>
      {error && <div className="alert alert-danger">Unable to load users: {error}</div>}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id}>
            <article className="card border-0 shadow-sm h-100"><div className="card-body d-flex align-items-center gap-3">
              <img className="avatar" src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Athlete')}`} alt="" />
              <div><h2 className="h5 mb-1">{user.name}</h2><p className="text-secondary mb-0">{user.email}</p></div>
            </div></article>
          </div>
        ))}
        {!users.length && !error && <p className="text-secondary">No users registered yet.</p>}
      </div>
    </section>
  )
}
