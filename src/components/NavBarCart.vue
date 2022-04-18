<template>
  <div class="navbar__cart">
    <div id="show-modal" @click="showModal = true" class="cart__icon">
      <div v-if="this.$store.state.shopCart.length > 0" class="cart__bubble">
        {{ this.$store.state.shopCart.length }}
      </div>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ModalContainer :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Оформить заказ</h3>
      </template>
    </ModalContainer>
  </Teleport>
</template>

<script>
import ModalContainer from '@/components/ModalContainer.vue'

export default {
  name: 'NavBarCart',
  components: {
    ModalContainer
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