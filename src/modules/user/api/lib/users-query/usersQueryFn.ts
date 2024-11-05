import { handledFetch } from "@/api"
import type { QueryFunction } from "@tanstack/vue-query"
import { unref } from "vue"
import type {
  UsersQueryData,
  UsersQueryFnData,
  UsersQueryKey
} from "../../composables/useUsersQuery"

type UsersQueryFn = QueryFunction<UsersQueryFnData, UsersQueryKey>

export const usersQueryFn: UsersQueryFn = async ({ queryKey: [, params], signal }) => {
  const searchParams = new URLSearchParams()

  const searchParamsMap = {
    "_page": params.page,
    "_limit": params.pageSize,
    "_sort": params.sort,
    "_order": params.order,
    "firstName_like": params.searchFirstName,
    "lastName_like": params.searchLastName,
    "email_like": params.searchEmail,
    "lastVisitedAt_gte": params.lastVisitedFrom,
    "lastVisitedAt_lte": params.lastVisitedTo,
  }

  Object.entries(searchParamsMap).forEach(([key, value]) => {
    const paramValue = unref(value)
    if (!paramValue) return

    searchParams.append(key, paramValue.toString())
  })

  return handledFetch<UsersQueryData>(`/users?${searchParams}`, { signal })
}
