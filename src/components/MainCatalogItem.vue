<template>
  <div class="main-catalog__item">
    <div class="item__image">
      <img :src="catalogItem.img" alt="item_image">
    </div>
    <div class="item__name">
      {{ catalogItem.name }}
    </div>
    <div class="item__cost">
      {{ price }}&nbsp;&#8381;
    </div>
    <div class="item__cart-button">
      <button class="cart-button">Добавить в корзину</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCatalogItem',
  props: {
    catalogItem: Object
  },
  computed: {
    price() {
      return this.catalogItem.price.toLocaleString('ru-RU')
    }
  }
}
</script>

<style>

</style>