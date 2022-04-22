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
      <div v-for="(prop, index) in catalogItemFull.reviews" :key="index" class="item_reviews__row">
        <div>
          <img :src="prop.avatar" alt="avatar">
        </div>
        <div>
          <div>
            <div>{{ prop.author }}</div>
            <div>{{ prop.rate }}</div>
          </div>
          <div>
            {{ prop.text }}
          </div>
        </div>
      </div>
    </Tab>
    <Tab id="item_feedback-review" name="Оставить отзыв">
      Оставить отзыв о товаре
    </Tab>
  </tabs>
</template>

<script>
import {Tabs, Tab} from 'vue3-tabs-component'

export default {
  name: 'ModalDetailedBody',
  components: {
    Tabs,
    Tab
  },
  props: {
    catalogItemFull: Object
  }
}
</script>

<style>

</style>