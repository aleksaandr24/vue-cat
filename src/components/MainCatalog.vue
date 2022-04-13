<template>
  <div class="main-catalog">
    <MainCatalogItem/>
    <MainCatalogItem/>
    <MainCatalogItem/>
    <MainCatalogItem/>
    <MainCatalogItem/>
  </div>
</template>

<script>
import MainCatalogItem from '@/components/MainCatalogItem.vue'

export default {
  name: 'MainCatalog',
  components: {
    MainCatalogItem
  }
}
</script>

<style>

</style>