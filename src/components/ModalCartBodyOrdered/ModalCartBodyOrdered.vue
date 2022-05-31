<template>
  <div class="cart-ordered">
    <h2 class="cart-ordered__title">Заказ успешно создан</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ModalCartBodyOrdered',
  
  mounted() {
    this.dropShopCart()
  },

  methods: {
    ...mapActions([
      'dropShopCart'
    ])
  }
}
</script>