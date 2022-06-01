<template>
  <Transition name="modal">
    <div
      v-if="show"
      @click="$emit('close')"
      class="modal-mask"
    >
      <div class="modal-wrapper">
        <div
          @click.stop
          class="modal-container"
        >
          <div class="modal-header">
            <div>
              <slot name="header"></slot>
            </div>
            <div
              @click="$emit('close')"
              class="modal-close"
            >
            </div>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ModalContainer',

  props: {
    show: Boolean
  },

  emits: [
    'close'
  ]
}
</script>