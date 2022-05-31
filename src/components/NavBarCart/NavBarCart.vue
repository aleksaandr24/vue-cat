<template>
  <div class="cart">
    <button
      @click="modalShow"
      tabindex="10"
      id="show-modal"
      class="cart__icon"
    >
      <div 
        v-if="this.$store.state.shopCart.length > 0"
        class="cart__bubble"
      >
        {{ this.$store.state.shopCart.length }}
      </div>
    </button>
  </div>
  <Teleport to="#app">
    <ModalContainer
      :show="showModal"
      @close="modalHide">
        <template #header>
          <h3 class="modal-header__title">Оформить заказ</h3>
        </template>
      <template #body>
        <ModalCartBodyOrdered v-if="this.$store.state.shopOrdered"/>
        <ModalCartBody v-else-if="this.$store.state.shopCart.length > 0"/>
        <ModalCartBodyEmpty v-else/>
      </template>
    </ModalContainer>
  </Teleport>
</template>

<script>
import ModalContainer from '@/components/ModalContainer/ModalContainer.vue'
import ModalCartBody from '@/components/ModalCartBody/ModalCartBody.vue'
import ModalCartBodyEmpty from '@/components/ModalCartBodyEmpty/ModalCartBodyEmpty.vue'
import ModalCartBodyOrdered from '@/components/ModalCartBodyOrdered/ModalCartBodyOrdered.vue'
import { mapActions } from 'vuex'

export default {
  name: 'NavBarCart',
  
  components: {
    ModalContainer,
    ModalCartBody,
    ModalCartBodyEmpty,
    ModalCartBodyOrdered
  },
  
  data() {
    return {
      showModal: false
    }
  },

  methods: {
    ...mapActions([
      'changeShopOrdered'
    ]),
    
    modalShow() {
      this.showModal = true
      document.body.classList.add('modal-open')
    },

    modalHide() {
      this.showModal = false
      this.changeShopOrdered(false)
      document.body.classList.remove('modal-open')
    }
  }
}
</script>