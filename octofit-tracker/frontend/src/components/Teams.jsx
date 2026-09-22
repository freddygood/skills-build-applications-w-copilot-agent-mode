import { useEffect, useState } from 'react'
import { fetchItems } from '../api'

export default function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems(endpoint).then(setTeams).catch((requestError) => setError(requestError.message))
  }, [endpoint])

  return (
    <section>
      <p className="eyebrow">Find your crew</p>
      <h1 className="display-6 mb-1">Teams</h1>
      <p className="text-secondary mb-4">Train together and celebrate every milestone.</p>
      {error && <div className="alert alert-danger">Unable to load teams: {error}</div>}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id}>
            <article className="card border-0 shadow-sm h-100"><div className="card-body">
              <h2 className="h5">{team.name}</h2>
              <p className="text-secondary mb-0">{team.members?.length || 0} members</p>
            </div></article>
          </div>
        ))}
        {!teams.length && !error && <p className="text-secondary">No teams created yet.</p>}
      </div>
    </section>
  )
}
