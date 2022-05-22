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
import { mapGetters } from 'vuex'

export default {
  name: 'MainCatalog',
  
  components: {
    MainCatalogItem
  },
  
  computed: {
    ...mapGetters({
      catalogItems: 'getCatalogItems'
    })
  }
}
</script>