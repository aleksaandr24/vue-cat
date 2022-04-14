import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      catalog: null    
    }
  },
  getters: {

  },
  mutations: {
    getCatalog(state) {
      axios
        .get('http://test1.web-gu.ru/')
        .then(response => state.catalog = response.data)
        .catch(error => console.log(error))
    }
  },
  actions: {

  }
})