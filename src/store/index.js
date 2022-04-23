import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  
  state() {
    return {
      
      dataJsonAPI: 'http://test1.web-gu.ru/',
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
      console.log('state.navBarMenuCurrentID:', state.navBarMenuCurrentID)
      console.log('state.sideMenuCurrentID:', state.sideMenuCurrentID)
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
      console.log('Catalog Items get:', catalogItems)
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
          // state.navBarMenuCurrentID = state.catalogData[0].id
          // state.sideMenuCurrentID = state.catalogData[0].children[0].id
          console.log('Catalog created', state.catalogData)
        })
        .catch(error => console.log(error))
    },
    
    setNavBarMenuCurrentID(state, id) {
      state.navBarMenuCurrentID = id
      console.log('NavBarMenuCurrentID set', id, state.navBarMenuCurrentID)
    },
    
    setSideMenuCurrentID(state, id) {
      state.sideMenuCurrentID = id
      console.log('SideMenuCurrentID set', id, state.sideMenuCurrentID)
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
      let path = 'http://test1.web-gu.ru/?action=show_product&id=' + state.modalDetailedCurrentID
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