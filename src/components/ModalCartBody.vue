<template>
  <div
    v-if="makingOrder"
    class="cart-ordering"
  >
    <CatalogPreloader/>
    <h2 class="cart-ordering__title">Создание заказа&#8230;</h2>
  </div>
  <div v-else>
    <div>
      <h3 class="cart_title">В корзине:</h3>
    </div>
    <div
      v-for="(item, index) in this.$store.state.shopCart"
      :key="index"
      :class="(index === this.$store.state.shopCart.length - 1 ? 'cart-item cart-item_last' : 'cart-item')">
      <div>
        <div class="cart-item__pic">
          <img
            :src="item.img"
            alt="item_image"
            class="cart-item__img"
          >
        </div>
      </div>
      <div class="cart-item__info">
        <div class="cart-item__name">
          {{ item.name }}
        </div>
        <div class="cart-item__cost">
          {{ item.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'}) }}
        </div>
        <div class="cart-item__delete">
          <button
            @click="this.$store.commit('deleteShopCart', item.id)"
            class="cart-item__delete-button"
          >
            Убрать из корзины
          </button>
        </div>
      </div>
    </div>
    <div>
      <form
        @submit.prevent="makeOrder"
        class="order-form">
        <div class="order-form__name">
          <div class="order-form__field">
            <label for="order-name">Имя</label><br>
            <input
              v-model.trim="orderFormName"
              :class="v$.orderFormName.$invalid ? 'order-form__input order-form__input_error' : 'order-form__input'"
              type="text"
              id="order-name"
              placeholder="Имя"
            >
            <span
              v-if="v$.orderFormName.$invalid"
              class="order-form__error"
            >
              {{ v$.orderFormName.required.$message }}
            </span>
          </div>
          <div class="order-form__field">
            <label for="order-phone">Телефон</label><br>
            <input
              v-model.trim="orderFormPhone"
              :class="v$.orderFormPhone.$invalid ? 'order-form__input order-form__input_error' : 'order-form__input'"
              type="text"
              id="order-phone"
              placeholder="+7 (950) 45-84-345"
            >
            <span
              v-if="v$.orderFormPhone.$invalid"
              class="order-form__error"
            >
              {{ v$.orderFormPhone.required.$message }}
            </span>
          </div>
        </div>
        <div class="order-form__address">
          <label for="order-address">Полный адрес</label><br>
          <input
            v-model.trim="orderFormAddress"
            :class="v$.orderFormPhone.$invalid ? 'order-form__input order-form__input_error' : 'order-form__input'"
            type="text"
            id="order-address"
            placeholder="Ул. Пушкина, дом"
          >
          <span
            v-if="v$.orderFormAddress.$invalid"
            class="order-form__error"
          >
            {{ v$.orderFormAddress.required.$message }}
          </span>
        </div>
        <div class="order-form__submit">
          <button
            type="submit"
            class="order-form__submit-button"
          >
            Заказать
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CatalogPreloader from '@/components/CatalogPreloader.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import axios from 'axios'

export default {
  name: 'ModalCartBody',

  components: {
    CatalogPreloader
  },
  
  setup() {
    return { v$: useVuelidate() }
  },
  
  data() {
    return {
      orderFormName: '',
      orderFormPhone: '',
      orderFormAddress: '',
      makingOrder: false
    }
  },
  
  validations() {
    return {
      orderFormName: {
        required: helpers.withMessage('Имя не должно быть пустым', required)
      },
      
      orderFormPhone: {
        required: helpers.withMessage('Телефон не должен быть пустым', required)
      },
      
      orderFormAddress: {
        required: helpers.withMessage('Адрес не должен быть пустым', required)
      }
    }
  },
  
  methods: {
    makeOrder() {
      if (!this.v$.orderFormName.$invalid &&
        !this.v$.orderFormPhone.$invalid &&
        !this.v$.orderFormAddress.$invalid) {
          let orderFormData = {
            orderFormName: this.orderFormName,
            orderFormPhone: this.orderFormPhone,
            orderFormAddress: this.orderFormAddress
          }
          axios({
            method: 'get',
            url: 'http://test1.web-gu.ru/?action=send_form',
            params: orderFormData,
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })
          .then(response => {
            if (response.data.result) {
              this.makingOrder = true
              setTimeout(() => {
                this.makingOrder = false
                this.$store.commit('changeShopOrdered', true)
              }, 2000) 
            }
            else {
              console.log('Making order error:')
            }            
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
}
</script>