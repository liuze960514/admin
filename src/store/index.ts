import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'

import getters from './getters'

import modules from './modules'

import mutations from './mutations'

import state from './states'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
