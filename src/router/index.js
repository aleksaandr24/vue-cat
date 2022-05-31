import CatalogPage from '@/views/CatalogPage/CatalogPage.vue'
import NotFoundPage from '@/views/NotFoundPage/NotFoundPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/catalog'
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogPage,
    children: [
      {
        path: ':categoryID',
        name: 'catalogCategory',
        component: CatalogPage,
        children: [
          {
            path: ':subCategoryID',
            name: 'catalogSubCategory',
            component: CatalogPage
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router