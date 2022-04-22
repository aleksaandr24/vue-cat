<template>
  <div class="modal-cart-ordered__body">
    <h2>Заказ успешно создан</h2>
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

<style>

</style>