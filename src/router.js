import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Pages from '@/pages/Pages.vue'
import NewPage from '@/pages/NewPage.vue'
import EditPage from '@/pages/EditPage.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/pages',
    component: Pages,
  },
  {
    path: '/new-page',
    component: NewPage,
  },
  {
    path: '/pages/:id',
    component: EditPage,
    props: true,
  },
]

if (import.meta.env.MODE == "development") {
  routes.push({
    path: '/dev/components',
    component: () => import('@/dev/Components.vue'),
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
