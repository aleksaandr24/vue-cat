<template>
  <div class="navbar__cart">
    <div id="show-modal" @click="showModal = true" class="cart__icon">
      <div v-if="this.$store.state.shopCart.length > 0" class="cart__bubble">
        {{ this.$store.state.shopCart.length }}
      </div>
    </div>
  </div>
  <Teleport to="#app">
    <ModalContainer :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Оформить заказ</h3>
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
import ModalContainer from '@/components/ModalContainer.vue'
import ModalCartBody from '@/components/ModalCartBody.vue'
import ModalCartBodyEmpty from '@/components/ModalCartBodyEmpty.vue'
import ModalCartBodyOrdered from '@/components/ModalCartBodyOrdered.vue'

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
  computed: {
    cartIndicator() {
      return true
    }
  }
}
</script>

<style>

</style>