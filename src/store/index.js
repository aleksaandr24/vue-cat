import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      catalogData: null
    }
  },
  getters: {

  },
  mutations: {
    getCatalogJSON(state) {
      const createTreeObj = (data, idField, parentField, rootParent) => {
        let tree = { [rootParent]: { children: [] } }
        data.forEach(n => tree[n[idField]] = { ...n, children: [] })
        data.forEach(n => tree[n[parentField]].children.push(tree[n[idField]]))
        return tree[rootParent].children
      }
      axios
        .get('http://test1.web-gu.ru/')
        .then(response => state.catalogData = createTreeObj(response.data, 'id', 'parent_id', -1))
        .catch(error => console.log(error))
      state.catalogDataObj = state.jsonCatalogData
      console.log()
    }
  },
  actions: {

  }
})