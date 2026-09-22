export function getApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return `${baseUrl}${path}`
}

export function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export async function fetchItems(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return getItems(await response.json())
}
