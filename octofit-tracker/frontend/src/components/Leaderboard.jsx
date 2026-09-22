import { useEffect, useState } from 'react'
import { fetchItems } from '../api'

export default function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems(endpoint).then(setEntries).catch((requestError) => setError(requestError.message))
  }, [endpoint])

  return (
    <section>
      <p className="eyebrow">Friendly competition</p>
      <h1 className="display-6 mb-1">Leaderboard</h1>
      <p className="text-secondary mb-4">See who is leading the OctoFit challenge.</p>
      {error && <div className="alert alert-danger">Unable to load leaderboard: {error}</div>}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light"><tr><th>Rank</th><th>Athlete</th><th className="text-end">Points</th></tr></thead>
            <tbody>
              {entries.map((entry, index) => {
                const user = typeof entry.user === 'object' ? entry.user : null
                return (
                  <tr key={entry._id || entry.id}>
                    <td><span className="rank">{entry.rank || index + 1}</span></td>
                    <td><strong>{user?.name || entry.name || 'OctoFit athlete'}</strong></td>
                    <td className="text-end fw-bold text-primary">{entry.points || 0}</td>
                  </tr>
                )
              })}
              {!entries.length && <tr><td colSpan="3" className="text-secondary text-center py-4">No leaderboard entries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
