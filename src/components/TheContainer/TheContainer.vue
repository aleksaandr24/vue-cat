<template>
  <div
    v-if="!$store.state.catalogDataLoading"
    class="container"
  >
    <NavBar/>
    <MainContainer/>
  </div>
  <div v-else class="container container_preload">
    <CatalogPreloader/>
  </div>
</template>

<script>
import CatalogPreloader from '@/components/CatalogPreloader/CatalogPreloader.vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import MainContainer from '@/components/MainContainer/MainContainer.vue'

export default {
  name: 'TheContainer',
  
  components: {
    CatalogPreloader,
    NavBar,
    MainContainer
  }
}
</script>