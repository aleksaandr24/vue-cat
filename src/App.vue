<template>
  <TheContainer/>
</template>

<script>
import TheContainer from '@/components/TheContainer.vue'

export default {
  name: 'App',
  components: {
    TheContainer
  },
  mounted() {
    this.$store.commit('getCatalogJSON')
  }
}
</script>

<style>

</style>