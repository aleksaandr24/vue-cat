import HomePage from '@/views/HomePage.vue'
// import DefaultSubCategoryPage from '@/views/DefaultSubCategoryPage.vue'
// import CurrentSubCategoryPage from '@/views/CurrentSubCategoryPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/category/:categoryID',
    component: HomePage
  },
  {
    path: '/category/:categoryID/subcategory/:subCategoryID',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router