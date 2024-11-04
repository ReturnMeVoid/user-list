import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/users" },
  {
    path: "/users",
    component: () => import ("@/modules/user/pages/UserListPage.vue"),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
