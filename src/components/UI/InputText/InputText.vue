<template>
  <input
    :value="modelValue"
    :class="'input-text ' + elementClass"
    :placeholder="elementPlaceholder"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
  >
</template>

<script>
export default {
  name: 'InputText',

  props: {
    modelValue: String,
    elementClass: String,
    elementPlaceholder: String
  },
  
  emits: [
    'update:modelValue'
  ]
}
</script>