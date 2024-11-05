import type { APISortDirection, HandledFetchReturn } from "@/api"
import type { PaginatedData } from "@/api/types/data"
import type { User } from "@/modules/user"
import { type DefaultError, useQuery } from "@tanstack/vue-query"
import type { MaybeRef } from "vue"
import { selectUsersData } from "../lib/users-query/selectUsersData"
import { usersQueryFn } from "../lib/users-query/usersQueryFn"

export const USERS_QUERY_ID = "users"

export type UserQueryKeyParams = Partial<{
  page: MaybeRef<number | undefined>;
  pageSize: MaybeRef<number | undefined>;
  searchFirstName: MaybeRef<string | undefined>;
  searchLastName: MaybeRef<string | undefined>;
  searchEmail: MaybeRef<string | undefined>;
  sort: MaybeRef<keyof User | undefined>;
  order: MaybeRef<APISortDirection | undefined>;
  lastVisitedFrom: MaybeRef<number | undefined>;
  lastVisitedTo: MaybeRef<number | undefined>;
}>

export type UsersQueryKey = Readonly<[typeof USERS_QUERY_ID, UserQueryKeyParams]>
export type UsersQueryData = User[]
export type UsersQuerySelectedData = PaginatedData<UsersQueryData>
export type UsersQueryFnData = HandledFetchReturn<UsersQueryData>
export type UsersQueryError = DefaultError

export const useUsersQuery = (queryKeyParams: UserQueryKeyParams) => {
  return useQuery<UsersQueryFnData, UsersQueryError, UsersQuerySelectedData, UsersQueryKey>({
    queryKey: [USERS_QUERY_ID, queryKeyParams],
    queryFn: usersQueryFn,
    select: selectUsersData,
  })
}
