import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      catalogData: null,
      navBarMenuCurrentID: 14
    }
  },
  getters: {
    getNavBarMenu: state => {
      let menuItems = []
      for (let key in state.catalogData) {
        menuItems.push(state.catalogData[key].name)
      }
      return menuItems
    },
    getSideMenu: state => {
      let menuItems = []
      for (let key in state.catalogData) {
        if (state.catalogData[key].id === state.navBarMenuCurrentID) {
          for (let k in state.catalogData[key].children) {
            menuItems.push(state.catalogData[key].children[k].name)
          }
        }
      }
      return menuItems
    }
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
    }
  },
  actions: {

  }
})