<template>
  <button
    :class="'main-button ' + elementClass"
  >
    {{ elementText }}
  </button>
</template>

<script>
export default {
  name: 'MainButton',

  props: {
    elementText: String,
    elementClass: String
  }
}
</script>