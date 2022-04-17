<template>
  <div class="navbar__menu">
    <ul class="navbar__menu-list">
      <li v-for="(menuItem, index) in navBarMenu" :key="index" :class="['navbar__menu-item', {'navbar__menu-item_current' : menuItem.id === this.$store.state.navBarMenuCurrentID}]">
        <router-link @click="setNavBarMenuCurrentID(menuItem.id)" class="navbar__menu-link" :to="'/category/' + menuItem.id">{{ menuItem.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavBarMenu',
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
  }
}
</script>

<style>

</style>