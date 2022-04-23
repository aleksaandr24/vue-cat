<template>
  <div v-if="sideMenu.length > 0" class="side-menu">
    <div v-for="(menuItem, index) in sideMenu" :key="index" class="side-menu__item">
      <router-link :class="['side-menu__link', {'side-menu__link_current' : menuItem.id === parseInt(subCategoryID)}]" :to="'/catalog/' + categoryID + '/' + menuItem.id">{{ menuItem.name }}</router-link>
    </div>
  </div>
  <div v-else class="side-menu">Категорий нет</div>
</template>

<script>
export default {
  name: 'MainSideMenu',
  props: {
    categoryID: {
      type: String,
      default: null
    },
    subCategoryID: {
      type: String,
      default: null
    }
  },
  computed: {
    sideMenu () {
      return this.$store.getters.getSideMenu
    }
  },
  mounted() {
    this.$store.commit('setSideMenuCurrentID', parseInt(this.subCategoryID))
  }
}
</script>

<style>

</style>