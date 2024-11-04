import { BASE_URL, HEADERS } from "@/api"

export type HandledFetchReturn<T> = {
  data: T;
  headers: Headers;
}

export const handledFetch = async <T>(endpoint: string, init?: RequestInit) => {
  const response = await fetch(
    BASE_URL + endpoint,
    { headers: HEADERS, ...init }
  )

  if (!response.ok) {
    throw new Error(`Network Error ${response.status}: ${response.statusText}`)
  }

  const data: T = await response.json()

  return <HandledFetchReturn<T>>{
    data,
    headers: response.headers,
  }
}
