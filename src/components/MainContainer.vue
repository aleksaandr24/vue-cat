<template>
  <div class="main-container">
    <MainSideMenu/>
    <MainCatalog/>
  </div>
</template>

<script>
import MainSideMenu from '@/components/MainSideMenu.vue'
import MainCatalog from '@/components/MainCatalog.vue'

export default {
  name: 'MainContainer',
  
  components: {
    MainSideMenu,
    MainCatalog
  }
}
</script>