<template>
  <div>
    <h3>В корзине:</h3>
  </div>
  <div v-for="(item, index) in this.$store.state.shopCart" :key="index" class="modal-cart__item">
    <div>
      <div class="item__image">
        <img :src="item.img" alt="item_image">
      </div>
    </div>
    <div class="item__info">
      <div class="item__name">
        {{ item.name }}
      </div>
      <div class="item__cost">
        {{ item.price.toLocaleString('ru-RU') }}&nbsp;&#8381;
      </div>
      <div class="item__delete">
        <button @click="this.$store.commit('deleteShopCart', item.id)">Убрать из корзины</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCartBody'
}
</script>

<style>

</style>