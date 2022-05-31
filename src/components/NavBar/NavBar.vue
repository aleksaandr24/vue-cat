<template>
  <div class="navbar">
    <NavBarLogo/>
    <NavBarMenu/>
    <NavBarCart/>
  </div>
</template>

<script>
import NavBarLogo from '@/components/NavBarLogo/NavBarLogo.vue'
import NavBarMenu from '@/components/NavBarMenu/NavBarMenu.vue'
import NavBarCart from '@/components/NavBarCart/NavBarCart.vue'

export default {
  name: 'NavBar',
  
  components: {
    NavBarLogo,
    NavBarMenu,
    NavBarCart
  }
}
</script>