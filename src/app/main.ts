import { router } from "@/app/routing/router"
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query"
import { createApp } from "vue"
import App from "./App.vue"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

createApp(App)
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .mount("#app")
