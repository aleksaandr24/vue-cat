<template>
  <textarea
    :value="modelValue"
    :class="elementClass"
    :placeholder="elementPlaceholder"
    :rows="elementRows"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
  >
  </textarea>
</template>

<script>
export default {
  name: 'TextArea',

  props: {
    modelValue: String,
    elementClass: String,
    elementPlaceholder: String,
    elementRows: Number
  },
  
  emits: [
    'update:modelValue'
  ]
}
</script>