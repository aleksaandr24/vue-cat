<template>
  <div v-if="catalogItems.length > 0" class="main-catalog">
      <MainCatalogItem v-for="(catalogItem, index) in catalogItems" :key="index" :catalogItem="catalogItem"/>
  </div>
  <div v-else class="main-catalog_empty">
    <h2>В данной категории товаров пока нет</h2>
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
      // if (this.$route.params.categoryID !== undefined) {
      //   this.$store.commit('setNavBarMenuCurrentID', this.$route.params.categoryID)
      // }
      // if (this.$route.params.subCategoryID !== undefined) {
      //   this.$store.commit('setSideMenuCurrentID', this.$route.params.subCategoryID)
      // }
      return this.$store.getters.getCatalogItems
    }
  }
}
</script>

<style>

</style>