import {getUserHome} from '../../utils'

const state = {
  homestead: localStorage.getItem('homestead') || getUserHome() + '/Homestead'
}

const mutations = {
  CHANGE_HOMESTEAD (state, homestead) {
    state.homestead = homestead
    localStorage.setItem('homestead', homestead)
  }
}

const actions = {
  changeHomestead ({ commit }, homestead) {
    commit('CHANGE_HOMESTEAD', homestead)
  }
}

const getters = {
  homestead () {
    return state.homestead
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
