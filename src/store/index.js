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
    async createCatalogJSON(state) {
      const createTreeObj = (data, idField, parentField, rootParent) => {
        let tree = { [rootParent]: { children: [] } }
        data.forEach(n => tree[n[idField]] = { ...n, children: [] })
        data.forEach(n => tree[n[parentField]].children.push(tree[n[idField]]))
        return tree[rootParent].children
      }
      state.catalogDataLoading = true
      await axios
        .get(state.dataJsonAPI)
        .then(response => {
          state.catalogData = createTreeObj(response.data, 'id', 'parent_id', -1)
          state.navBarMenuCurrentID = state.catalogData[0].id
          state.sideMenuCurrentID = state.catalogData[0].children[0].id
          setTimeout(() => state.catalogDataLoading = false, 2000)
        })
        .catch(error => {
          console.log(error)
          state.catalogDataLoading = false
        })
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
    
    changeShopOrdered(state, flag) {
      state.shopOrdered = flag
    },
    
    defaultShopCart(state) {
      state.shopCart = []
    },
    
    setModalDetailedCurrentID(state, itemID) {
      state.modalDetailedCurrentID = itemID
    },
    
    getModalDetailedCurrentItem(state) {
      let path = state.currentDataJsonAPI + state.modalDetailedCurrentID
      axios
        .get(path)
        .then(response => { 
          state.modalDetailedCurrentItem = response.data
        })
        .catch(error => console.log(error))
    },
    
    addtModalDetailedCurrentItemReview(state, review) {
      state.modalDetailedCurrentItem.reviews.push(review)
    }
  }
})