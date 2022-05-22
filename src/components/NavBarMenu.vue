<template>
  <div class="navbar__menu">
    <ul v-if="navBarMenu.length > 0" class="navbar__menu-list">
      <li v-for="(menuItem, index) in navBarMenu" :key="index" :class="['navbar__menu-item', {'navbar__menu-item_current' : menuItem.id === parseInt(categoryID)}]">
        <router-link @click="this.$store.commit('setNavBarMenuCurrentID', menuItem.id)" class="navbar__menu-link" :to="'/catalog/' + menuItem.id">{{ menuItem.name }}</router-link>
      </li>
    </ul>
    <div v-else class="navbar__menu-list">Категорий нет</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBarMenu',
  
  computed: {
    ...mapGetters({
      navBarMenu: 'getNavBarMenu'
    }),
    
    categoryID() {
      return this.$route.params.categoryID
    },

    subCategoryID() {
      return this.$route.params.subCategoryID
    }
  },

  beforeCreate() { 
    if (this.categoryID !== undefined) {
    this.$store.commit('setNavBarMenuCurrentID', parseInt(this.categoryID))

      if (this.subCategoryID !== undefined) {
      this.$store.commit('setSideMenuCurrentID', parseInt(this.subCategoryID))
      } else {
        this.$router.push({
          name: 'catalogSubCategory',
          params: {
            categoryID: this.categoryID,
            subCategoryID: this.$store.getters.getDefaultSideMenuCurrentID
          }
        })
      }
    } else {
      this.$router.push({
        name: 'catalogCategory',
        params: {
          categoryID: this.$store.getters.getDefaultNavBarCurrentID
        }
      })
    }
  },

  beforeUpdate() {
    if (this.categoryID !== undefined) {
    this.$store.commit('setNavBarMenuCurrentID', parseInt(this.categoryID))

      if (this.subCategoryID !== undefined) {
      this.$store.commit('setSideMenuCurrentID', parseInt(this.subCategoryID))
      } else {
        this.$router.push({
          name: 'catalogSubCategory',
          params: {
            categoryID: this.categoryID,
            subCategoryID: this.$store.getters.getDefaultSideMenuCurrentID
          }
        })
      }
    } else {
      this.$router.push({
        name: 'catalogCategory',
        params: {
          categoryID: this.$store.getters.getDefaultNavBarCurrentID
        }
      })
    }
  }
}
</script>