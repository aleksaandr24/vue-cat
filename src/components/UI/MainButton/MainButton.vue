<template>
  <button
    :class="elementClass"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'MainButton',

  props: {
    elementClass: String
  }
}
</script>