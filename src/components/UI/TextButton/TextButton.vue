<template>
  <button
    class="text-button"
  >
    {{ elementText }}
  </button>
</template>

<script>
export default {
  name: 'TextButton',

  props: {
    elementText: String
  }
}
</script>