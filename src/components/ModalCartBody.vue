<template>
  <div>
    <h3>В корзине:</h3>
  </div>
  <div v-for="(item, index) in this.$store.state.shopCart" :key="index" :class="(index === this.$store.state.shopCart.length - 1 ? 'modal-cart__item modal-cart__item_last' : 'modal-cart__item')">
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
  <div>
    <form @submit.prevent="makeOrder" class="order-form">
      <div class="order-form__name">
        <div>
          <label for="orderFormName">Имя</label><br>
          <input type="text" v-model.trim="orderFormName" placeholder="Имя" :class="v$.orderFormName.$invalid ? 'order-form__input order-form__input_error' : 'order-form__input'">
          <span v-if="v$.orderFormName.$invalid" class="order-form__error">
            {{ v$.orderFormName.required.$message }}
          </span>
        </div>
        <div>
          <label for="orderFormPhone">Телефон</label><br>
          <input type="text" v-model.trim="orderFormPhone" placeholder="+7 (950) 45-84-345" :class="v$.orderFormPhone.$invalid ? 'order-form__input order-form__input_error' : 'order-form__input'">
          <span v-if="v$.orderFormPhone.$invalid" class="order-form__error">
            {{ v$.orderFormPhone.required.$message }}
          </span>
        </div>
      </div>
      <div class="order-form__address">
        <label for="orderFormAddress">Полный адрес</label><br>
        <input type="text" v-model.trim="orderFormAddress" placeholder="Ул. Пушкина, дом" :class="v$.orderFormPhone.$invalid ? 'order-form__input order-form__input_error' : 'order-form__input'">
        <span v-if="v$.orderFormAddress.$invalid" class="order-form__error">
          {{ v$.orderFormAddress.required.$message }}
        </span>
      </div>
      <div class="order-form__button">
        <button type="submit">Заказать</button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import axios from 'axios'

export default {
  name: 'ModalCartBody',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      orderFormName: '',
      orderFormPhone: '',
      orderFormAddress: ''
    }
  },
  validations () {
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
            headers: {'Content-Type': 'application/json; charset=UTF-8' }
            })
          .then(response => {
            this.$store.commit('changeShopOrdered', response.data.result)
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
}
</script>

<style>

</style>