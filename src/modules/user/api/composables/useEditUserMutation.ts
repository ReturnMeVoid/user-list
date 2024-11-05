import type { HandledFetchReturn } from "@/api"
import type { User } from "@/modules/user"
import { DefaultError, type MutationOptions, useMutation } from "@tanstack/vue-query"
import { editUserMutationFn } from "../lib/edit-user-mutation/editUserMutationFn"

export const EDIT_USER_MUTATION_KEY = "editUser"

export type EditUserData = HandledFetchReturn<User>
export type EditUserVariables = Partial<User>
export type EditUserError = DefaultError

export type EditUserMutationOptions = MutationOptions<
  EditUserData,
  DefaultError,
  EditUserVariables
>

export const useEditUserMutation = (mutationOptions: EditUserMutationOptions) => {
  return useMutation<EditUserData, EditUserError, EditUserVariables>({
    mutationKey: [EDIT_USER_MUTATION_KEY],
    mutationFn: editUserMutationFn,
    ...mutationOptions,
  })
}
