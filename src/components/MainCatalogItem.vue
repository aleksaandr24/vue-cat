<template>
  <div class="main-catalog__item">
    <div class="item__image" @click="setStateCurrentItem">
      <img :src="catalogItem.img" alt="item_image">
    </div>
    <div class="item__name" @click="setStateCurrentItem">
      {{ catalogItem.name }}
    </div>
    <div class="item__cost">
      {{ catalogItem.price.toLocaleString('ru-RU') }}&nbsp;&#8381;
    </div>
    <div class="item__cart-button">
      <button v-if="!isInSHopCart(catalogItem.id)" @click="addShopCart" class="cart-button">Добавить в корзину</button>
      <button v-else class="cart-button cart-button_in-cart" @click="this.$store.commit('deleteShopCart', catalogItem.id)">В корзине</button>
    </div>
  </div>
  <Teleport to="#app">
    <ModalContainer :show="showModal" @close="showModal = false; this.$store.commit('setModalDetailedCurrentID', null)">
      <template #header>
        <h3>Информация</h3>
      </template>
      <template #body>
        <ModalDetailedBody :catalogItemFull="this.$store.state.modalDetailedCurrentItem"/>
      </template>
    </ModalContainer>
  </Teleport>
</template>

<script>
import ModalContainer from '@/components/ModalContainer.vue'
import ModalDetailedBody from '@/components/ModalDetailedBody.vue'

export default {
  name: 'MainCatalogItem',
  components: {
    ModalContainer,
    ModalDetailedBody
  },
  data() {
    return {
      showModal: false
    }
  },
  props: {
    catalogItem: Object
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
    },
    setStateCurrentItem() {
      this.showModal = true
      this.$store.commit('setModalDetailedCurrentID', this.catalogItem.id)
      this.$store.commit('getModalDetailedCurrentItem')
    }
  }
}
</script>

<style>

</style>