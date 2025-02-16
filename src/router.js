import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Pages from '@/pages/Pages.vue'
import NewPage from '@/pages/NewPage.vue'
import EditPage from '@/pages/EditPage.vue'
import EditComponent from '@/pages/EditComponent.vue'
import Components from '@/pages/Components.vue'
import NewComponent from '@/pages/NewComponent.vue'

const routes = [
  {
    path: '/admin',
    component: Home,
  },
  {
    path: '/admin/login',
    component: Login,
  },
  {
    path: '/admin/pages',
    component: Pages,
  },
  {
    path: '/admin/new-page',
    component: NewPage,
  },
  {
    path: '/admin/new-component',
    component: NewComponent,
  },
  {
    path: '/admin/pages/:id',
    component: EditPage,
    props: true,
  },
  {
    path: '/admin/components/:id',
    component: EditComponent,
    props: true,
  },
  {
    path: '/admin/components',
    component: Components,
  },
]

if (import.meta.env.MODE == "development") {
  routes.push({
    path: '/admin/dev/components',
    component: () => import('@/dev/Components.vue'),
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
