<template>
  <img
    v-for="yellow in rate"
    :key="yellow"
    src="@/assets/images/reviews__star_yellow.svg"
    class="rate-image"
  >
  <img
    v-for="gray in (5 - rate)"
    :key="gray"
    src="@/assets/images/reviews__star_gray.svg"
    class="rate-image">
</template>

<script>
export default {
  name: 'ReviewRating',
  
  props: {
    rate: Number
  }
}
</script>