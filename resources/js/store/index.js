import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const authModule={
  state,  
  getters,
  actions,
  mutations
}

// one store for entire application
export default new Vuex.Store({
  modules:{
      authModule
  }
})