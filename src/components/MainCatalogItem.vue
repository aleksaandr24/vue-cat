<template>
  <div class="main-catalog__item">
    <div v-if="imageLoading" class="item_image item__image_preload">
      <CatalogPreloader/>
    </div>    
    <div class="item__image" @click="modalShow">
      <img :src="catalogItem.img" alt="item_image" @load="setImageLoaded">
    </div>
    <div class="item__name" @click="modalShow">
      <button tabindex="20">{{ catalogItem.name }}</button>
    </div>
    <div class="item__cost">
      {{ catalogItem.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'}) }}
    </div>
    <div class="item__cart-button">
      <button tabindex="21" v-if="!isInShopCart(catalogItem.id)" @click="addShopCart" class="cart-button">Добавить в корзину</button>
      <button tabindex="21" v-else class="cart-button cart-button_in-cart" @click="this.$store.commit('deleteShopCart', catalogItem.id)">В корзине</button>
    </div>
  </div>
  <Teleport to="#app">
    <ModalContainer :show="showModal" @close="modalHide">
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
import CatalogPreloader from '@/components/CatalogPreloader.vue'

export default {
  name: 'MainCatalogItem',
  
  components: {
    ModalContainer,
    ModalDetailedBody,
    CatalogPreloader
  },
  
  data() {
    return {
      showModal: false,
      imageLoading: true
    }
  },
  
  props: {
    catalogItem: Object
  },
  
  methods: {
    addShopCart() {
      this.$store.commit('addShopCart', this.catalogItem)
    },
    
    isInShopCart(itemID) {
      for (let key in this.$store.state.shopCart) {
        if (this.$store.state.shopCart[key].id === itemID) {
          return true
        }
      }
      return false
    },
    
    setImageLoaded() {
      setTimeout(() => this.imageLoading = false, 1000)
    },

    modalShow() {
      this.showModal = true
      document.body.classList.add('modal-open')
      this.$store.commit('setModalDetailedCurrentID', this.catalogItem.id)
      this.$store.commit('getModalDetailedCurrentItem')
    },

    modalHide() {
      this.showModal = false
      this.$store.commit('setModalDetailedCurrentID', null)
    }
  }
}
</script>