<template>
  <ul
    v-if="sideMenu.length > 0"
    class="side-menu">
    <li
      v-for="(menuItem, index) in sideMenu"
      :key="index"
      class="side-menu__item"
    >
      <router-link
        @click="this.makeCurrentSideMenuID(menuItem.id)"
        :to="'/catalog/' + categoryID + '/' + menuItem.id"
        :class="['side-menu__link', {'side-menu__link_current' : menuItem.id === subCategoryID}]"
      >
        {{ menuItem.name }}
      </router-link>
    </li>
  </ul>
  <div
    v-else
    class="side-menu">
      Категорий нет
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      return parseInt(this.$route.params.subCategoryID)
    }
  },

  methods: {
    ...mapActions([
      'makeCurrentSideMenuID'
    ])
  }
}
</script>