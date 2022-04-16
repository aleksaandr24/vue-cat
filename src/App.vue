<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.commit('getCatalogJSON')
  }
}
</script>

<style>

</style>