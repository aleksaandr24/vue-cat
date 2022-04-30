<template>
  <div class="navbar">
    <NavBarLogo/>
    <NavBarMenu/>
    <NavBarCart/>
  </div>
</template>

<script>
import NavBarLogo from '@/components/NavBarLogo.vue'
import NavBarMenu from '@/components/NavBarMenu.vue'
import NavBarCart from '@/components/NavBarCart.vue'

export default {
  name: 'NavBar',
  
  components: {
    NavBarLogo,
    NavBarMenu,
    NavBarCart
  }
}
</script>