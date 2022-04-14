<template>
  <div class="container">
    <NavBar/>
    <MainContainer/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MainContainer from '@/components/MainContainer.vue'

export default {
  name: 'TheContainer',
  components: {
    NavBar,
    MainContainer
  }
}
</script>

<style>

</style>