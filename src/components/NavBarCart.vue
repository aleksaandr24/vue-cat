<template>
  <div class="navbar__cart">
    <div class="cart__icon">
      <div v-if="this.$store.state.shopCart.length > 0" class="cart__bubble">
        {{ this.$store.state.shopCart.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBarCart',
  computed: {
    cartIndicator() {
      return true
    }
  }
}
</script>

<style>

</style>