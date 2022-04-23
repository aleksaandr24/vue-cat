<template>
  <div class="navbar__menu">
    <ul v-if="navBarMenu.length > 0" class="navbar__menu-list">
      <li v-for="(menuItem, index) in navBarMenu" :key="index" :class="['navbar__menu-item', {'navbar__menu-item_current' : menuItem.id === parseInt(categoryID)}]">
        <router-link @click="setNavBarMenuCurrentID(menuItem.id)" class="navbar__menu-link" :to="'/catalog/' + menuItem.id">{{ menuItem.name }}</router-link>
      </li>
    </ul>
    <div v-else class="navbar__menu-list">Категорий нет</div>
  </div>
</template>

<script>
export default {
  name: 'NavBarMenu',
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
    navBarMenu() {
      return this.$store.getters.getNavBarMenu
    }
  },
  methods: {
    setNavBarMenuCurrentID(id) {
      this.$store.commit('setNavBarMenuCurrentID', id)
      this.$store.commit('setDefaultSideMenuCurrentID', id)
    }
  },
  mounted() {
    
    if (this.categoryID !== null) {
      this.$store.commit('setNavBarMenuCurrentID', parseInt(this.categoryID))
      
    }
    
    if (this.subCategoryID !== null) {
      this.$store.commit('setSideMenuCurrentID', parseInt(this.subCategoryID))
      
    }
    
  }
}
</script>

<style>

</style>