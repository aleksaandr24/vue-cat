<template>
  <div class="navbar__menu">
    <ul
      v-if="getNavBarMenu.length > 0"
      class="navbar__menu-list">
      <li
        v-for="(menuItem, index) in getNavBarMenu"
        :key="index"
        :class="['navbar__menu-item', {'navbar__menu-item_current' : menuItem.id === parseInt(categoryID)}]"
      >
        <router-link
          @click="this.makeCurrentNavBarID(menuItem.id)"
          class="navbar__menu-link" :to="'/catalog/' + menuItem.id">
            {{ menuItem.name }}
        </router-link>
      </li>
    </ul>
    <div v-else class="navbar__menu-list">Категорий нет</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavBarMenu',
  
  computed: {
    ...mapGetters([
      'getNavBarMenu'
    ]),
    
    categoryID() {
      return this.$route.params.categoryID
    },

    subCategoryID() {
      return this.$route.params.subCategoryID
    }
  },

  beforeCreate() { 
    if (this.categoryID !== undefined) {
    this.makeCurrentNavBarID(parseInt(this.categoryID))

      if (this.subCategoryID !== undefined) {
      this.makeCurrentSideMenuID(parseInt(this.subCategoryID))
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
    this.makeCurrentNavBarID(parseInt(this.categoryID))

      if (this.subCategoryID !== undefined) {
      this.makeCurrentSideMenuID(parseInt(this.subCategoryID))
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

  methods: {
    ...mapActions([
      'makeCurrentNavBarID',
      'makeCurrentSideMenuID'
    ])
  }
}
</script>