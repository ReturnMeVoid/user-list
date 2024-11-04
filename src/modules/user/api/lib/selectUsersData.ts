import type { APIPaginationInfo } from "@/api"
import { linkHeaderToObject } from "@/lib/linkHeaderToObject"
import type { UsersQueryFnData, UsersSelectedData } from "../composables/useUsersQuery"

export const selectUsersData = (data: UsersQueryFnData): UsersSelectedData => {
  const linkHeader = data.headers.get("Link")

  const paginationInfo = linkHeaderToObject<keyof APIPaginationInfo, number | null>(
    linkHeader,
    getPageFromURL,
  )

  if (paginationInfo === null) {
    throw new Error("Cannot get link header")
  }

  if (paginationInfo.last === null) {
    throw new Error("Cannot get link header data (rel=\"last\")")
  }

  if (!paginationInfo.last) paginationInfo.last = 1

  return {
    ...paginationInfo,
    data: data.data,
  }
}

const getPageFromURL = (url: string) => {
  const page = new URL(url).searchParams.get("_page")

  if (page === null) return null
  return Number(page)
}
