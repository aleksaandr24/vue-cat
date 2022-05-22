<template>
  <div v-if="sideMenu.length > 0" class="side-menu">
    <div v-for="(menuItem, index) in sideMenu" :key="index" class="side-menu__item">
      <router-link @click="this.$store.commit('setSideMenuCurrentID', menuItem.id)" :class="['side-menu__link', {'side-menu__link_current' : menuItem.id === parseInt(subCategoryID)}]" :to="'/catalog/' + categoryID + '/' + menuItem.id">{{ menuItem.name }}</router-link>
    </div>
  </div>
  <div v-else class="side-menu">Категорий нет</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainSideMenu',

  computed: {
    ...mapGetters({
      sideMenu: 'getSideMenu'
    }),

    categoryID() {
      return this.$route.params.categoryID
    },

    subCategoryID() {
      return this.$route.params.subCategoryID
    }
  }
}
</script>