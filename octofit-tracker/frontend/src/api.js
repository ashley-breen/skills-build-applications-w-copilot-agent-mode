const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(resource) {
  return `${apiOrigin}/api/${resource}/`
}

export function collectionFrom(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(apiUrl(resource))
  if (!response.ok) throw new Error(`Could not load ${resource}`)
  return collectionFrom(await response.json())
}