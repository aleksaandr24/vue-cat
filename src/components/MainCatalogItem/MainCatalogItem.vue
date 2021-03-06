<template>
  <div class="catalog-item">
    <div
      v-if="imageLoading"
      class="catalog-item__pic catalog-item__pic_preload"
    >
      <CatalogPreloader/>
    </div>    
    <div
      @click="modalShow"
      class="catalog-item__pic"
    >
      <img 
        @load="setImageLoaded"
        :src="catalogItem.img"
        alt="item_image"
        class="catalog-item__img"
      >
    </div>
    <div
      @click="modalShow"
      class="catalog-item__name"
    >
      <a
        tabindex="20"
        class="catalog-item__name-link"
      >
        {{ catalogItem.name }}
      </a>
    </div>
    <div class="catalog-item__cost">
      {{ catalogItem.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'}) }}
    </div>
    <div class="catalog-item__cart">
      <MainButton
        v-if="!isInShopCart(catalogItem.id)"
        :elementClass="'main-button cart-button'"
        :loading="buttonLoading"
        @click="addToShopCart"
        tabindex="21"
      >
        Добавить в корзину
      </MainButton>
      <MainButton
        v-else
        :elementClass="'main-button cart-button cart-button_in-cart'"
        :loading="buttonLoading"
        @click="deleteFromShopCart"
        tabindex="21"
      >
        В корзине
      </MainButton>
    </div>
  </div>
  <Teleport to="#app">
    <ModalContainer
      :show="showModal"
      @close="modalHide">
      <template #header>
        <h3>Информация</h3>
      </template>
      <template #body>
        <ModalDetailedBody
          :catalogItemFull="this.$store.state.modalDetailedCurrentItem"
        />
      </template>
    </ModalContainer>
  </Teleport>
</template>

<script>
import ModalContainer from '@/components/ModalContainer/ModalContainer.vue'
import ModalDetailedBody from '@/components/ModalDetailedBody/ModalDetailedBody.vue'
import CatalogPreloader from '@/components/CatalogPreloader/CatalogPreloader.vue'
import MainButton from '@/components/UI/MainButton/MainButton.vue'
import { mapActions } from 'vuex'

export default {
  name: 'MainCatalogItem',
  
  components: {
    ModalContainer,
    ModalDetailedBody,
    CatalogPreloader,
    MainButton
  },
  
  data() {
    return {
      showModal: false,
      imageLoading: true,
      buttonLoading: false
    }
  },
  
  props: {
    catalogItem: Object
  },
  
  methods: {
    ...mapActions([
      'makePushShopCartItem',
      'removeShopCartItem',
      'makeCurrentModalDetailedID',
      'getModalDetailedCurrentItem'
    ]),
    
    addToShopCart() {
      this.buttonLoading = true
      this.makePushShopCartItem(this.catalogItem).then(
        this.buttonLoading = false
      )
    },

    deleteFromShopCart() {
      this.buttonLoading = true
      this.removeShopCartItem(this.catalogItem.id).then(
        this.buttonLoading = false
      )
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
      this.makeCurrentModalDetailedID(this.catalogItem.id)
      this.getModalDetailedCurrentItem()
    },

    modalHide() {
      this.showModal = false
      this.makeCurrentModalDetailedID(null)
      document.body.classList.remove('modal-open')
    }
  }
}
</script>