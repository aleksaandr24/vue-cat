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
      <button v-if="!isInSHopCart(catalogItem.id)" @click="addShopCart" class="cart-button">Добавить в корзину</button>
      <button v-else class="cart-button cart-button_in-cart">В корзине</button>
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
  },
  methods: {
    addShopCart() {
      this.$store.commit('addShopCart', this.catalogItem)
    },
    isInSHopCart(itemID) {
      for (let key in this.$store.state.shopCart) {
        if (this.$store.state.shopCart[key].id === itemID) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style>

</style>