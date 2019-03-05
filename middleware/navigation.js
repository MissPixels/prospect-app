export default ({ store }) => {
  if (process.client && store.state.shouldShowSplashLogo) {
    store.dispatch('disableSplashLogo')
  }
}
