import { useEffect, useState } from 'react'
import { fetchItems } from '../api'

export default function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems(endpoint).then(setWorkouts).catch((requestError) => setError(requestError.message))
  }, [endpoint])

  return (
    <section>
      <p className="eyebrow">Personalized movement</p>
      <h1 className="display-6 mb-1">Workouts</h1>
      <p className="text-secondary mb-4">Choose a session that matches your goals.</p>
      {error && <div className="alert alert-danger">Unable to load workouts: {error}</div>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id || workout.id}>
            <article className="card border-0 shadow-sm h-100"><div className="card-body">
              <span className="badge text-bg-warning mb-3">{workout.difficulty || 'All levels'}</span>
              <h2 className="h5">{workout.title}</h2>
              <p className="text-secondary">{workout.description}</p>
              <ul className="small text-secondary mb-0">{(workout.exercises || []).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul>
            </div></article>
          </div>
        ))}
        {!workouts.length && !error && <p className="text-secondary">No workouts available yet.</p>}
      </div>
    </section>
  )
}
