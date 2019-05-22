const state = {
  connected: false
}

const mutations = {
  CHANE_CONNECTED (state, connected) {
    state.connected = connected
  }
}

const actions = {
  changeConnected ({ commit }, connected) {
    commit('CHANE_CONNECTED', connected)
  }
}

const getters = {
  connected () {
    return state.connected
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
