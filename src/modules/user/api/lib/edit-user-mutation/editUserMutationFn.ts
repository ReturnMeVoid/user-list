import { handledFetch } from "@/api"
import type { User } from "@/modules/user"
import type { MutationFunction } from "@tanstack/vue-query"
import type {
  EditUserData,
  EditUserVariables,
} from "../../composables/useEditUserMutation"

type EditUserMutationFn = MutationFunction<EditUserData, EditUserVariables>

export const editUserMutationFn: EditUserMutationFn = (user) => {
  return handledFetch<User>(`/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
  })
}
