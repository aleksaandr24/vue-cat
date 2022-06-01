<template>
  <div class="detailed-pic">
    <img
      :src="catalogItemFull.img"
      alt="item_image"
      class="detailed-pic__img"
    >
  </div>
  <div class="detailed-name">
    {{ catalogItemFull.name }}
  </div>
  <div class="detailed-price">
    {{ catalogItemFull.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'}) }}
  </div>
  <div class="detailed-tabs">
    <TabsContainer v-model="active">
      <MainTab
        title="Описание"
        tab-key="tab1"
      >
        <div v-html="catalogItemFull.descr"></div>
      </MainTab>
      <MainTab
        title="Характеристики"
        tab-key="tab2"
      >
        <div
          v-for="(prop, index) in catalogItemFull.props"
          :key="index"
          class="item-properties__row"
        >
        <div class="item-properties__row-caption">
          {{ prop.caption }}
        </div>
        <div class="item-properties__row-value">
          {{ prop.value }}&nbsp;{{ prop.measure }}
        </div>
      </div>
      </MainTab>
      <MainTab
        title="Отзывы"
        tab-key="tab3"
      >
        <div v-if="catalogItemFull.reviews.length > 0">
        <div
          v-for="(prop, index) in catalogItemFull.reviews.slice().reverse()"
          :key="index"
          class="item-reviews__row"
        >
          <div class="item-reviews__avatar">
            <img
              :src="prop.avatar"
              alt="avatar"
              class="item-reviews__img"
            >
          </div>
          <div>
            <div class="item-reviews__author">
              <div class="item-reviews__author-name">
                {{ prop.author }}
              </div>
              <div class="item-reviews__author-rate">
                <ReviewRating :rate="prop.rate"/>
              </div>
            </div>
            <div class="item-reviews__text">
              {{ prop.text }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="item-reviews__author-name"
      >
        Отзывов нет
      </div>
      </MainTab>
      <MainTab
        title="Оставить отзыв"
        tab-key="tab4"
      >
        <div v-if="!reviewSended">
        <form
          @submit.prevent="addReview"
          class="review-form"
        >
          <div>
            <div class="review-form__rate">Оценка</div>
            <div class="rating-area">
              <input
                v-model="reviewFormRating"
                @change="v$.reviewFormRating.$touch"
                type="radio"
                id="star-5"
                value="5"
                class="rating-area__input"
              >
              <label
                for="star-5"
                title="Оценка 5"
                class="rating-area__label"
              >
              </label>	
              <input
                v-model="reviewFormRating"
                @change="v$.reviewFormRating.$touch"
                type="radio"
                id="star-4"
                value="4"
                class="rating-area__input"
              >
              <label
                for="star-4"
                title="Оценка 4"
                class="rating-area__label"
              >
              </label>    
              <input
                v-model="reviewFormRating"
                @change="v$.reviewFormRating.$touch"
                type="radio"
                id="star-3"
                value="3"
                class="rating-area__input"
              >
              <label
                for="star-3"
                title="Оценка 3"
                class="rating-area__label"
              >
              </label>  
              <input
                v-model="reviewFormRating"
                @change="v$.reviewFormRating.$touch"
                type="radio"
                id="star-2"
                value="2"
                class="rating-area__input"
              >
              <label
                for="star-2"
                title="Оценка 2"
                class="rating-area__label"
              >
              </label>    
              <input
                v-model="reviewFormRating"
                @change="v$.reviewFormRating.$touch"
                type="radio"
                id="star-1"
                value="1"
                class="rating-area__input"
              >
              <label
                for="star-1"
                title="Оценка 1"
                class="rating-area__label"
              >
              </label>
            </div>
            <div>
              <span
                v-if="!v$.reviewFormRating.$dirty"
                class="review-form__error"
              >
                {{ v$.reviewFormRating.required.$message }}
              </span>
            </div>
          </div>
          <div class="review-form__name">
            <label for="review-name">Имя</label><br>
            <InputText
              v-model.trim="reviewFormName"
              :class="v$.reviewFormName.$invalid ? 'input-text input-text_error' : 'input-text'"
              :placeholder="'Имя'"
              id="review-name"
            />
            <br>
            <span
              v-if="v$.reviewFormName.$invalid"
              class="review-form__error"
            >
              {{ v$.reviewFormName.required.$message }}
            </span>
          </div>
          <div class="review-form__text">
            <label for="review-text">Отзыв</label><br>
            <MainTextArea
              v-model.trim="reviewFormText"
              :class="v$.reviewFormText.$invalid ? 'text-area text-area_error' : 'text-area'"
              :rows="10"
              :placeholder="'Отзыв'"
              id="review-text"
            />
            <br>
            <span
              v-if="v$.reviewFormText.$invalid"
              class="order-form__error"
            >
              {{ v$.reviewFormText.required.$message }}
            </span>
          </div>
          <div class="review-form__submit">
            <MainButton
              :elementText="'Отправить отзыв'"
              :elementClass="'review-form__submit-button'"
              type="submit"
              tabindex="21"
            />
          </div>
        </form>
      </div>
      <div
        v-else
        class="review-form__recieve"
      >
        <h2 class="review-form__recieve-title">Отзыв получен</h2>
      </div>
      </MainTab>
    </TabsContainer>
  </div>
</template>

<script>
import TabsContainer from '@/components/UI/TabsContainer/TabsContainer.vue'
import MainTab from '@/components/UI/MainTab/MainTab.vue'
import ReviewRating from '@/components/ReviewRating/ReviewRating.vue'
import MainButton from '@/components/UI/MainButton/MainButton.vue'
import InputText from '@/components/UI/InputText/InputText.vue'
import MainTextArea from '@/components/UI/MainTextArea/MainTextArea.vue'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { mapActions } from 'vuex'

export default {
  name: 'ModalDetailedBody',
  
  components: {
    TabsContainer,
    MainTab,
    ReviewRating,
    MainButton,
    InputText,
    MainTextArea
  },
  
  props: {
    catalogItemFull: Object
  },
  
  setup() {
    const active = ref(1)
    
    return {
      active,
      v$: useVuelidate()
    }
  },

  data() {
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
    ...mapActions([
      'makeCurrentModalDetailedReview'
    ]),
    
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
        this.makeCurrentModalDetailedReview(reviewFormData)
        this.reviewSended = true
        this.reviewFormRating = null
        this.reviewFormName = null
        this.reviewFormText = null
      }
    }
  }
}
</script>