<template>
  <div class="side-menu">
    <MainSideMenuItem/>
    <MainSideMenuItem/>
    <MainSideMenuItem/>
  </div>
</template>

<script>
import MainSideMenuItem from '@/components/MainSideMenuItem.vue'

export default {
  name: 'MainSideMenu',
  components: {
    MainSideMenuItem
  }
}
</script>

<style>

</style>