<template>
  <div class="not-found">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__text">The page you are looking for does not exist.</p>
    <p class="not-found__text">How you got here is a mystery.</p>
    <p class="not-found__text">But you can click the button below to go back to the homepage.</p>
    <button
      @click="goHome"
      class="not-found__button"
    >
      HOME
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotFoundPage',
  
  computed: {
    ...mapGetters([
      'getDefaultNavBarCurrentID',
      'getDefaultSideMenuCurrentID'
    ])
  },

  methods: {
    goHome() {
      this.$router.push({
        name: 'catalogSubCategory',
        params: {
          categoryID: this.getDefaultNavBarCurrentID,
          subCategoryID: this.getDefaultSideMenuCurrentID
        }
      })
    }
  }
}
</script>