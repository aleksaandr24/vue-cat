<template>
  <textarea
    :value="modelValue"
    :class="elementClass"
    :placeholder="elementPlaceholder"
    :rows="elementRows"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  </textarea>
</template>

<script>
import InputText from '@/components/UI/InputText/InputText.vue'

export default {
  name: 'TextArea',

  extends: InputText,

  props: {
    elementRows: Number
  }
}
</script>