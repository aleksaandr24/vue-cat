<template>
  <div
    v-if="selectedTabState.selectedTabKey == tabKey"
  >
    <slot/>
  </div>
</template>

<script>
  import { inject } from 'vue'
  
  export default {
    name: 'MainTab',
    
    props: [
      'title',
      'tab-key'
    ],

    setup(props) {
      const selectedTabState = inject('selectedTabState')
      return { ...props, selectedTabState }
    }
  }
</script>