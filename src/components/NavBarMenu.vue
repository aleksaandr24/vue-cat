<template>
  <div class="navbar__menu">
    <ul class="navbar__menu-list">
      <li v-for="(menuItem, index) in navBarMenu" :key="index" :class="['navbar__menu-item', {'navbar__menu-item_current' : menuItem === this.$store.state.navBarMenuCurrentName}]">
        <a class="navbar__menu-link" href="/">{{ menuItem }}</a>
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
  }
}
</script>

<style>

</style>