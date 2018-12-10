import Vue from 'vue'
import Vuex from 'vuex'

import authMutations from './auth/mutations'
import authState from './auth/state'
import authActions from './auth/actions'
import authGetters from './auth/getters'

import cartMutations from './cart/mutations'
import cartState from './cart/state'
import cartActions from './cart/actions'
import cartGetters from './cart/getters'

import productMutations from './products/mutations'
import productState from './products/state'
import productActions from './products/actions'
import productGetters from './products/getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const authModule={
  namespaced: true,
  state:authState,  
  getters:authGetters,
  actions:authActions,
  mutations:authMutations
}

const cartModule={
  namespaced: true,
  state:cartState,  
  getters:cartGetters,
  actions:cartActions,
  mutations:cartMutations
}

const productModule={
  namespaced: true,
  state:productState,  
  getters:productGetters,
  actions:productActions,
  mutations:productMutations
}

// one store for entire application
export default new Vuex.Store({
  strict: debug,
  modules:{
      authModule,
      cartModule,
      productModule
  }
})