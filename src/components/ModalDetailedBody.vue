<template>
  <div class="modal-detailed__item-image">
    <img :src="catalogItemFull.img" alt="item_image">
  </div>
  <div class="modal-detailed__item-name">
    {{ catalogItemFull.name }}
  </div>
  <div class="modal-detailed__item-price">
    {{ catalogItemFull.price.toLocaleString('ru-RU') }}&nbsp;&#8381;
  </div>
  <Tabs :options="{ useUrlFragment: false }" wrapper-class="modal-detailed__item-tabs-wrapper" panels-wrapper-class="item-tabs__panels" nav-class="item-tabs__nav" nav-item-class="item-tabs__item" nav-item-active-class="item-tabs__item_active" nav-item-link-class="item-tabs__link" nav-item-link-active-class="item-tabs__link_active">
    <Tab id="item_description" name="Описание" panel-class="item_tabs__panel">
      <div v-html="catalogItemFull.descr"></div>
    </Tab>
    <Tab id="item_properties" name="Характеристики">
      <div v-for="(prop, index) in catalogItemFull.props" :key="index" class="item_properties__row">
        <div>{{ prop.caption }}</div>
        <div class="item_properties__row-value">{{ prop.value }}&nbsp;{{ prop.measure }}</div>
      </div>
    </Tab>
    <Tab id="item_reviews" name="Отзывы">
      <div v-if="catalogItemFull.reviews.length > 0">
        <div v-for="(prop, index) in catalogItemFull.reviews.slice().reverse()" :key="index" class="item_reviews__row">
          <div class="item_reviews__avatar">
            <img :src="prop.avatar" alt="avatar">
          </div>
          <div>
            <div class="item_reviews__author">
              <div class="item_reviews__author-name">{{ prop.author }}</div>
              <div class="item_reviews__author-rate">
                <ReviewRating :rate="prop.rate"/>
              </div>
            </div>
            <div class="item_reviews__text">
              {{ prop.text }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="item_reviews__author-name">Отзывов нет</div>
    </Tab>
    <Tab id="item_feedback-review" name="Оставить отзыв">
      <div v-if="!reviewSended">
        <form @submit.prevent="addReview" class="review-form">
          <div>
            <div class="review-form__rate">Оценка</div>
            <div class="rating-area">
              <input type="radio" id="star-5" v-model="reviewFormRating" @change="v$.reviewFormRating.$touch" value="5">
              <label for="star-5" title="Оценка 5"></label>	
              <input type="radio" id="star-4" v-model="reviewFormRating" @change="v$.reviewFormRating.$touch" value="4">
              <label for="star-4" title="Оценка 4"></label>    
              <input type="radio" id="star-3" v-model="reviewFormRating" @change="v$.reviewFormRating.$touch" value="3">
              <label for="star-3" title="Оценка 3"></label>  
              <input type="radio" id="star-2" v-model="reviewFormRating" @change="v$.reviewFormRating.$touch" value="2">
              <label for="star-2" title="Оценка 2"></label>    
              <input type="radio" id="star-1" v-model="reviewFormRating" @change="v$.reviewFormRating.$touch" value="1">
              <label for="star-1" title="Оценка 1"></label>
            </div>
            <div>
              <span v-if="!v$.reviewFormRating.$dirty" class="review-form__error">
              {{ v$.reviewFormRating.required.$message }}
              </span>
            </div>
          </div>
          <div class="review-form__name">
            <label for="review-name">Имя</label><br>
            <input type="text" id="review-name" v-model.trim="reviewFormName" placeholder="Имя" :class="v$.reviewFormName.$invalid ? 'review-form__input review-form__input_error' : 'review-form__input'"><br>
            <span v-if="v$.reviewFormName.$invalid" class="review-form__error">
              {{ v$.reviewFormName.required.$message }}
            </span>
          </div>
          <div class="review-form__text">
            <label for="review-text">Отзыв</label><br>
            <textarea rows="10" id="review-text" v-model.trim="reviewFormText" placeholder="Отзыв" :class="v$.reviewFormName.$invalid ? 'review-form__textarea review-form__textarea_error' : 'review-form__textarea'"></textarea><br>
            <span v-if="v$.reviewFormText.$invalid" class="order-form__error">
              {{ v$.reviewFormText.required.$message }}
            </span>
          </div>
          <div class="review-form__button">
            <button type="submit">Отправить отзыв</button>
          </div>
        </form>
      </div>
      <div v-else class="review-form__recieve">
        <h2>Отзыв получен</h2>
      </div>
    </Tab>
  </tabs>
</template>

<script>
import {Tabs, Tab} from 'vue3-tabs-component'
import ReviewRating from '@/components/ReviewRating.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  name: 'ModalDetailedBody',
  
  setup () {
    return { v$: useVuelidate() }
  },
  
  components: {
    Tabs,
    Tab,
    ReviewRating
  },
  
  props: {
    catalogItemFull: Object
  },
  
  data () {
    return {
      reviewFormRating: null,
      reviewFormName: null,
      reviewFormText: null,
      reviewSended: false
    }
  },
  
  validations () {
    return {
      reviewFormRating: {
        required: helpers.withMessage('Оценка не должна быть пустой', required)
      },
      
      reviewFormName: {
        required: helpers.withMessage('Имя не должно быть пустым', required)
      },
      
      reviewFormText: {
        required: helpers.withMessage('Отзыв не должен быть пустым', required)
      }
    }
  },
  
  methods: {
    addReview() {
      if (!this.v$.reviewFormRating.$invalid &&
        !this.v$.reviewFormName.$invalid &&
        !this.v$.reviewFormText.$invalid) {
        let reviewFormData = {
          rate: parseInt(this.reviewFormRating),
          author: this.reviewFormName,
          avatar: 'https://loremflickr.com/60/60',
          text: this.reviewFormText
        }
        this.$store.commit('addtModalDetailedCurrentItemReview', reviewFormData)
        this.reviewSended = true
        this.reviewFormRating = null
        this.reviewFormName = null
        this.reviewFormText = null
      }
    }
  }
}
</script>