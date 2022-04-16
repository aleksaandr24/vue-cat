<template>
  <div class="main-catalog">
      <MainCatalogItem v-for="(catalogItem, index) in catalogItems" :key="index" :catalogItem="catalogItem"/>
  </div>
</template>

<script>
import MainCatalogItem from '@/components/MainCatalogItem.vue'

export default {
  name: 'MainCatalog',
  components: {
    MainCatalogItem
  },
  computed: {
    catalogItems () {
      return this.$store.getters.getCatalogItems
    }
  }
}
</script>

<style>

</style>