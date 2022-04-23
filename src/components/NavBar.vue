<template>
  <div class="navbar">
    <NavBarLogo/>
    <router-view name="navbar"/>
    <NavBarCart/>
  </div>
</template>

<script>
import NavBarLogo from '@/components/NavBarLogo.vue'
import NavBarCart from '@/components/NavBarCart.vue'

export default {
  name: 'NavBar',
  components: {
    NavBarLogo,
    NavBarCart
  }
}
</script>

<style>

</style>