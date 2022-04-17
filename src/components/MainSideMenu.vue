<template>
  <div class="side-menu">
    <div v-for="(menuItem, index) in sideMenu" :key="index" class="side-menu__item">
      <router-link @click="setSideMenuCurrentID(menuItem.id)" :class="['side-menu__link', {'side-menu__link_current' : menuItem.id === this.$store.state.sideMenuCurrentID}]" :to="'/category/' + this.$store.state.navBarMenuCurrentID + '/subcategory/' + menuItem.id">{{ menuItem.name }}</router-link>
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
  },
  methods: {
    setSideMenuCurrentID(id) {
      this.$store.commit('setSideMenuCurrentID', id)
    }
  }
}
</script>

<style>

</style>