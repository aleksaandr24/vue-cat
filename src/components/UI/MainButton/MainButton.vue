<template>
  <button
    :class="elementClass"
    :disabled="loading"
  >
    <div
      v-if="loading"
      class="lds-squares"
    >
      <div class="lds-squares__square"></div>
      <div class="lds-squares__square"></div>
      <div class="lds-squares__square"></div>
      <div class="lds-squares__square"></div>
    </div>
    <slot v-else/>
  </button>
</template>

<script>
export default {
  name: 'MainButton',

  props: {
    elementClass: String,
    loading: Boolean
  }
}
</script>