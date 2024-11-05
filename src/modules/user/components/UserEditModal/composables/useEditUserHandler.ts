import type { User } from "@/modules/user"
import { useQueryClient } from "@tanstack/vue-query"
import type { Ref } from "vue"
import { useEditUserMutation } from "../../../api/composables/useEditUserMutation"
import { USERS_QUERY_ID } from "../../../api/composables/useUsersQuery"

const EDIT_MODAL_AUTOCLOSE_TIMEOUT = 1200

export const useEditUserHandler = (user: Ref<User | undefined>, isEditModalOpen: Ref<boolean>) => {
  const queryClient = useQueryClient()

  const { mutate, reset, isPending, isError, isSuccess } = useEditUserMutation({
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_ID] })

      setTimeout(() => {
        isEditModalOpen.value = false
        reset()
      }, EDIT_MODAL_AUTOCLOSE_TIMEOUT)
    }
  })

  const handleEditUser = (event: Event) => {
    const form = event.target as HTMLFormElement
    const { firstName, lastName, email } = Object.fromEntries(new FormData(form))

    if (!user.value) throw new Error("Cannot find user")

    mutate({
      id: user.value.id,
      firstName: firstName as string,
      lastName: lastName as string,
      email: email as string,
    })
  }

  return { handleEditUser, isPending, isError, isSuccess }
}
