import {getUserHome, isWin, php} from '../../utils'

const state = {
  homestead: localStorage.getItem('homestead') || getUserHome() + '/Homestead',
  vagrant: localStorage.getItem('vagrant') || (isWin() ? 'C:/HashiCorp/Vagrant/bin/vagrant' : ''),
  php: php()
}

const mutations = {
  CHANGE_HOMESTEAD (state, homestead) {
    state.homestead = homestead
    if (homestead) {
      homestead = homestead.replace(/\\/g, '/')
    }
    localStorage.setItem('homestead', homestead)
  },
  CHANGE_VAGRANT (state, vagrant) {
    state.vagrant = vagrant
    if (vagrant) {
      vagrant.replace(/\\/g, '/')
    }
    localStorage.setItem('vagrant', vagrant)
  }
}

const actions = {
  changeHomestead ({ commit }, homestead) {
    commit('CHANGE_HOMESTEAD', homestead)
  },
  changeVagrant ({ commit }, vagrant) {
    commit('CHANGE_VAGRANT', vagrant)
  }
}

const getters = {
  homestead () {
    return state.homestead
  },
  vagrant () {
    return state.vagrant
  },
  php () {
    return state.php
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
