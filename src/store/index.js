import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state() {
    return {
      dataJsonAPI: 'http://test1.web-gu.ru/',
      catalogData: null,
      navBarMenuCurrentID: null,
      sideMenuCurrentID: null,
      shopCart: []
    }
  },
  getters: {
    getNavBarMenu: state => {
      let menuItems = []
      for (let key in state.catalogData) {
        menuItems.push({id: state.catalogData[key].id, name: state.catalogData[key].name})
      }
      return menuItems
    },
    getSideMenu: state => {
      let menuItems = []
      for (let key in state.catalogData) {
        if (state.catalogData[key].id === state.navBarMenuCurrentID) {
          for (let k in state.catalogData[key].children) {
            menuItems.push({id: state.catalogData[key].children[k].id, name: state.catalogData[key].children[k].name})
          }
        }
      }
      return menuItems
    },
    getCatalogItems: state => {
      let catalogItems = []      
      for (let key in state.catalogData) {
        if (state.catalogData[key].id === state.navBarMenuCurrentID) {
          for (let k in state.catalogData[key].children) {
            if (state.catalogData[key].children[k].id === state.sideMenuCurrentID) {
              for (let j in state.catalogData[key].children[k].children) {
                catalogItems.push(state.catalogData[key].children[k].children[j])
              }
            }
          }
        }
      }
      return catalogItems
    }
  },
  mutations: {
    createCatalogJSON(state) {
      const createTreeObj = (data, idField, parentField, rootParent) => {
        let tree = { [rootParent]: { children: [] } }
        data.forEach(n => tree[n[idField]] = { ...n, children: [] })
        data.forEach(n => tree[n[parentField]].children.push(tree[n[idField]]))
        return tree[rootParent].children
      }
      axios
        .get(state.dataJsonAPI)
        .then(response => {
          state.catalogData = createTreeObj(response.data, 'id', 'parent_id', -1)
          state.navBarMenuCurrentID = state.catalogData[0].id
          state.sideMenuCurrentID = state.catalogData[0].children[0].id
        })
        .catch(error => console.log(error))
    },
    setNavBarMenuCurrentID(state, id) {
      state.navBarMenuCurrentID = id
    },
    setSideMenuCurrentID(state, id) {
      state.sideMenuCurrentID = id
    },
    setDefaultSideMenuCurrentID(state, id) {
      for (let key in state.catalogData) {
        if (state.catalogData[key].id === id) {
          state.sideMenuCurrentID = state.catalogData[key].children[0].id
        }
      }
    },
    addShopCart(state, catalogItem) {
      state.shopCart.push(catalogItem)
    }
  }
})