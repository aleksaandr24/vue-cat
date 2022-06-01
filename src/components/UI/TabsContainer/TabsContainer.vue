<template>
  <div class="tabs-container">
    <ul class="tabs-header">
      <li
        v-for="tab in tabs"
        :key="tab.key"
        :class="selectedTabState.selectedTabKey === tab.key
                ? 'tabs-header__item tabs-header__item_active'
                : 'tabs-header__item'"
        @click="selectedTabState.selectedTabKey = tab.key"
      >
        {{ tab.title }}
      </li>
    </ul>
    <div class="tab-content">
      <slot/>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, provide, reactive } from 'vue'
  
  export default {
    name: 'TabsContainer',

    props: {
      modelValue: {
        type: [String, Number]
      }
    },

    emits: [
      'update:modelValue'
    ],

    setup(props, { slots }) {
    const tabs = ref([])
    const selectedTabState = reactive({ selectedTabKey: null })
    
    provide('selectedTabState', selectedTabState)
    
    onMounted(function () {
      tabs.value = slots.default().map((i) => {
        if (i.props && i.props['tab-key']) {
          return {
            key: i.props['tab-key'],
            title: i.props.title,
          };
        }
      })
      selectedTabState.selectedTabKey = tabs.value[0] && tabs.value[0].key
    })
    return { tabs, selectedTabState }
  }
  }
</script>