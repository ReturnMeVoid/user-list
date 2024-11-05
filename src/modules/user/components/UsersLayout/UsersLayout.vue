<script setup lang="ts">
import type { APISortDirection } from "@/api"
import { PageHeader, PaginationButtons } from "@/components"
import type { User } from "@/modules/user"
import { FluidContainer, LoadingSpinner, SkeletonBlock } from "@/ui"
import { useRouteQuery } from "@vueuse/router"
import { ref } from "vue"
import { useUsersQuery } from "../../api/composables/useUsersQuery"
import UserCard from "../UserCard/UserCard.vue"
import UserEditModal from "../UserEditModal/UserEditModal.vue"
import UserFilters from "../UserFilters/UserFilters.vue"
import UsersPerPage from "../UsersPerPage/UsersPerPage.vue"

const searchFirstName = useRouteQuery<string | undefined>("firstName_like")
const searchLastName = useRouteQuery<string | undefined>("lastName_like")
const searchEmail = useRouteQuery<string | undefined>("email_like")
const page = useRouteQuery<number | undefined>("page", 1, { transform: Number })
const pageSize = useRouteQuery<number | undefined>("page-size", 10, { transform: Number })
const sort = useRouteQuery<keyof User | undefined>("sort")
const order = useRouteQuery<APISortDirection | undefined>("order")
const lastVisitedFrom = useRouteQuery<number | undefined>("lastVisited_gte")
const lastVisitedTo = useRouteQuery<number | undefined>("lastVisited_lte")

const { data: users, isLoading, isFetching } = useUsersQuery({
  page,
  pageSize,
  searchFirstName,
  searchLastName,
  searchEmail,
  sort,
  order,
  lastVisitedFrom,
  lastVisitedTo,
})

const currentEditingUser = ref<User>()
const isModalOpen = ref(false)

const handleEdit = (user: User | undefined) => {
  if (!user) throw new Error("Cannot find user")

  currentEditingUser.value = user
  isModalOpen.value = true
}
</script>

<template>
  <div class="users-layout">
    <UserEditModal v-model="isModalOpen" :user="currentEditingUser!" />

    <PageHeader>
      <h1 class="users-layout__heading">User List</h1>

      <div class="users-layout__toolbar">
        <UsersPerPage v-model:pageSize="pageSize" @change="page = 1" />
        <LoadingSpinner v-if="isFetching" />
        <PaginationButtons v-model:page="page" :maxPages="users?.last" />
      </div>
    </PageHeader>

    <FluidContainer is="main" class="users-layout__main">
      <UserFilters />

      <ul class="users-layout__users-list">
        <template v-if="!isLoading && users?.data.length">
          <UserCard
            v-for="user in users.data"
            :key="user.id"
            :user
            @edit="handleEdit(user)"
          />
        </template>

        <template v-else-if="!isLoading && !users?.data.length">
          <div class="users-layout__no-data"><span>:(</span>No data found</div>
        </template>

        <template v-else>
          <SkeletonBlock
            v-for="key in Array(pageSize).keys()"
            :key
            height="88px"
            borderRadius="16px"
          />
        </template>
      </ul>
    </FluidContainer>
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
