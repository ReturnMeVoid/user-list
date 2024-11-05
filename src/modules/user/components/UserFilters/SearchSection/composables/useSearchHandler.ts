import { useRouteQuery } from "@vueuse/router";

export const useSearchHandler = () => {
  const page = useRouteQuery<number | undefined>("page", 1, { transform: Number })
  const searchFirstName = useRouteQuery<string | undefined>("firstName_like")
  const searchLastName = useRouteQuery<string | undefined>("lastName_like")
  const searchEmail = useRouteQuery<string | undefined>("email_like")

  const handleSearch = (event: Event) => {
    const form = event.target as HTMLFormElement
    const { firstName, lastName, email } = Object.fromEntries(new FormData(form))

    page.value = 1

    if (firstName) searchFirstName.value = firstName as string
    else searchFirstName.value = undefined

    if (lastName) searchLastName.value = lastName as string
    else searchLastName.value = undefined

    if (email) searchEmail.value = email as string
    else searchEmail.value = undefined
  }

  const handleReset = () => {
    searchFirstName.value = undefined
    searchLastName.value = undefined
    searchEmail.value = undefined
  }

  return {
    handleSearch,
    handleReset,
    searchFirstName,
    searchLastName,
    searchEmail,
  }
}
