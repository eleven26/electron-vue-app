const state = {
  exec: require('../../utils/request').exec
}

const mutations = {
  CHANGE_EXEC (state, exec) {
    state.exec = exec
  }
}

const actions = {
  changeExec ({ commit }, exec) {
    commit('CHANGE_EXEC', exec)
  }
}

const getters = {
  exec () {
    return state.exec
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
