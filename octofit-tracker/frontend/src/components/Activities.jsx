import { useEffect, useState } from 'react'
import { fetchItems } from '../api'

export default function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems(endpoint)
      .then(setActivities)
      .then(() => setStatus('ready'))
      .catch((requestError) => {
        setError(requestError.message)
        setStatus('error')
      })
  }, [endpoint])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1 className="display-6 mb-1">Activities</h1>
          <p className="text-secondary mb-0">Track every workout and earn points.</p>
        </div>
        <span className="badge rounded-pill text-bg-primary">{activities.length} logged</span>
      </div>
      {status === 'loading' && <div className="alert alert-light">Loading activities...</div>}
      {status === 'error' && <div className="alert alert-danger">Unable to load activities: {error}</div>}
      {status === 'ready' && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6 col-xl-4" key={activity._id || activity.id}>
              <article className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge text-bg-success">{activity.type}</span>
                    <strong className="text-primary">+{activity.points || 0} pts</strong>
                  </div>
                  <h2 className="h5">{activity.duration || 0} minutes</h2>
                  <p className="text-secondary mb-0">
                    {activity.date ? new Date(activity.date).toLocaleDateString() : 'Date not provided'}
                  </p>
                </div>
              </article>
            </div>
          ))}
          {!activities.length && <p className="text-secondary">No activities logged yet.</p>}
        </div>
      )}
    </section>
  )
}
