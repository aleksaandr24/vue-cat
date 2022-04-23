import CatalogPage from '@/views/CatalogPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import MainSideMenu from '@/components/MainSideMenu.vue'
import MainCatalog from '@/components/MainCatalog.vue'
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
    components: {
      default: CatalogPage,
      navbar: NavBarMenu,
      sidemenu: MainSideMenu,
      main: MainCatalog
    },
    props: {
      navbar: true,
      sidemenu: true,
      main: true
    },
    children: [
      {
        path: ':categoryID',
        components: {
          navbar: NavBarMenu,
          sidemenu: MainSideMenu,
          main: MainCatalog
        },
        props: {
          navbar: true,
          sidemenu: true,
          main: true
        },
        children: [
          {
            path: ':subCategoryID',
            components: {
              navbar: NavBarMenu,
              sidemenu: MainSideMenu,
              main: MainCatalog
            },
            props: {
              navbar: true,
              sidemenu: true,
              main: true
            }
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