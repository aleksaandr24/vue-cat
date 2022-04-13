<template>
  <div class="container" @click="increment">
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
  },
  methods: {
    increment() {
      console.log('hello')
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    }
  }
}
</script>

<style>

</style>