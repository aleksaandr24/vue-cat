import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  
  state() {
    return {
      dataJsonAPI: 'http://test1.web-gu.ru/',
      currentDataJsonAPI: 'http://test1.web-gu.ru/?action=show_product&id=',
      catalogDataLoading: false,
      catalogData: null,
      navBarMenuCurrentID: null,
      sideMenuCurrentID: null,
      modalDetailedCurrentID: null,
      modalDetailedCurrentItem: null,
      shopCart: [],
      shopOrdered: false
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
    },

    getDefaultNavBarCurrentID: state => {
      return state.catalogData[0].id
    },

    getDefaultSideMenuCurrentID: state => {
      for (let key in state.catalogData) {
        if (state.catalogData[key].id === state.navBarMenuCurrentID) {
          return state.catalogData[key].children[0].id
        }
      }
    }
  },
  
  mutations: {
    setCatalogDataLoading(state, flag) {
      state.catalogDataLoading = flag
    },
    
    setCatalogData(state, data) {
      state.catalogData = data
    },

    setNavBarMenuCurrentID(state, id) {
      state.navBarMenuCurrentID = id
    },
    
    setSideMenuCurrentID(state, id) {
      state.sideMenuCurrentID = id
    },
    
    addShopCart(state, catalogItem) {
      state.shopCart.push(catalogItem)
    },
    
    deleteShopCart(state, shopCartItem) {
      for (let key in state.shopCart) {
        if (state.shopCart[key].id === shopCartItem) {
          state.shopCart.splice(key, 1)
        }
      }
    },
    
    setShopOrdered(state, flag) {
      state.shopOrdered = flag
    },
    
    defaultShopCart(state) {
      state.shopCart = []
    },
    
    setModalDetailedCurrentID(state, itemID) {
      state.modalDetailedCurrentID = itemID
    },
    
    setModalDetailedCurrentItem(state, item) {
      state.modalDetailedCurrentItem = item
    },
    
    addtModalDetailedCurrentItemReview(state, review) {
      state.modalDetailedCurrentItem.reviews.push(review)
    }
  },

  actions: {
    async createCatalogJSON({ commit, state }) {
      const createTreeObj = (data, idField, parentField, rootParent) => {
        let tree = { [rootParent]: { children: [] } }
        data.forEach(n => tree[n[idField]] = { ...n, children: [] })
        data.forEach(n => tree[n[parentField]].children.push(tree[n[idField]]))
        return tree[rootParent].children
      }
      commit('setCatalogDataLoading', true)
      await axios
        .get(state.dataJsonAPI)
        .then(response => {
          let responseData = createTreeObj(response.data, 'id', 'parent_id', -1)
          commit('setCatalogData', responseData)
          commit('setNavBarMenuCurrentID', state.catalogData[0].id)
          commit('setSideMenuCurrentID', state.catalogData[0].children[0].id)
          setTimeout(() => state.catalogDataLoading = false, 2000)
        })
        .catch(error => {
          console.log(error)
          commit('setCatalogDataLoading', false)
        })
    },

    makeCurrentNavBarID({ commit }, id) {
      commit('setNavBarMenuCurrentID', id)
    },

    makeCurrentSideMenuID({ commit }, id) {
      commit('setSideMenuCurrentID', id)
    },

    makePushShopCartItem({ commit }, item) {
      commit('addShopCart', item)
    },

    removeShopCartItem({ commit }, item) {
      commit('deleteShopCart', item)
    },

    changeShopOrdered({ commit }, flag) {
      commit('setShopOrdered', flag)
    },

    dropShopCart({ commit }) {
      commit('defaultShopCart')
    },

    makeCurrentModalDetailedID({ commit }, id) {
      commit('setModalDetailedCurrentID', id)
    },

    async getModalDetailedCurrentItem({ commit, state }) {
      const path = state.currentDataJsonAPI + state.modalDetailedCurrentID
      await axios
        .get(path)
        .then(response => { 
          commit('setModalDetailedCurrentItem', response.data)
        })
        .catch(error => console.log(error))
    },

    makeCurrentModalDetailedReview({ commit }, review) {
      commit('addtModalDetailedCurrentItemReview', review)
    }
  }
})