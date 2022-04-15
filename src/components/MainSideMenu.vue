<template>
  <div class="side-menu">
    <div v-for="(menuItem, index) in sideMenu" :key="index" class="side-menu__item">
      <a :class="['side-menu__link', {'side-menu__link_current' : menuItem === this.$store.state.sideMenuCurrentName}]" href="#">{{ menuItem }}</a>
  </div>
  </div>
</template>

<script>
export default {
  name: 'MainSideMenu',
  computed: {
    sideMenu () {
      return this.$store.getters.getSideMenu
    }
  }
}
</script>

<style>

</style>