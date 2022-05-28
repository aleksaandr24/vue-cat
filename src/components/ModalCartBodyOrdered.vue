<template>
  <div class="cart-ordered">
    <h2 class="cart-ordered__title">Заказ успешно создан</h2>
  </div>
</template>

<script>
export default {
  name: 'ModalCartBodyOrdered',
  
  mounted() {
    this.$store.commit('defaultShopCart')
  }
}
</script>