import { yiq } from '~/utils/helpers'

export const state = () => ({
  shouldShowSplashLogo: true,
  homeCurrentPage: 1,
  menuIsOpen: false,
  currentColor: [0, 0, 0]
})

export const mutations = {
  setShouldShowSplashLogo (state, shouldShow) {
    state.shouldShowSplashLogo = shouldShow
  },
  setHomeCurrentPage (state, page) {
    state.homeCurrentPage = page
  },
  openMenu (state) {
    state.menuIsOpen = true
  },
  closeMenu (state) {
    state.menuIsOpen = false
  },
  setCurrentColor (state, color) {
    state.currentColor = color
  }
}

export const actions = {
  disableSplashLogo ({ commit }) {
    commit('setShouldShowSplashLogo', false)
  },
  setHomeCurrentPage ({ commit }, page) {
    commit('setHomeCurrentPage', page)
  },
  openMenu ({ commit }) {
    commit('openMenu')
  },
  closeMenu ({ commit }) {
    commit('closeMenu')
  },
  setCurrentColor ({ commit }, color = [0, 0, 0]) {
    commit('setCurrentColor', color)
  }
}

export const getters = {
  currentColorYiq: ({ currentColor }) => yiq(currentColor)
}
