const state = {
  foundationPath: localStorage.getItem('foundation_path'),
  env: localStorage.getItem('env')
}

const mutations = {
  CHANGE_FOUNDATION_PATH (state, foundationPath) {
    // 修改 Foundation 路径的时候更新 localStorage，同时把路径的 \ 替换成 \\（因为 \ 会产生转义效果）
    if (foundationPath) {
      if (foundationPath.match(/\\/g) && !foundationPath.match(/\\\\/g)) {
        foundationPath = foundationPath.replace(/\\/g, '\\\\')
      }
    }

    state.foundationPath = foundationPath
    localStorage.setItem('foundation_path', foundationPath)
  },
  CHANGE_ENV (state, env) {
    state.env = env
    localStorage.setItem('env', env)
  }
}

const actions = {
  changeFoundationPath ({ commit }, foundationPath) {
    commit('CHANGE_FOUNDATION_PATH', foundationPath)
  },
  changeEnv ({ commit }, env) {
    commit('CHANGE_ENV', env)
  }
}

const getters = {
  foundationPath () {
    return state.foundationPath
  },
  env () {
    return state.env
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
