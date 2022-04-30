<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  
  created() {
    //Read the status information in sessionStorage when the page is loaded
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //Save the information in vuex to sessionStorage when the page is refreshed
    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })

    this.$store.commit('createCatalogJSON')
  }
}
</script>