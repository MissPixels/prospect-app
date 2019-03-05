<template>
  <section class="container">
    <SplashLogo
      v-if="shouldShowSplashLogo"
      class="splash-logo"
      @gone="handleSplashLogoGone"
    />
    <SplashEntry
      v-if="shouldShowEntry"
      :key="lastEntryShownAt"
      :entry="currentEntry"
      @finished="handleEntryFinished"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import SplashLogo from '~/components/SplashLogo.vue'
import SplashEntry from '~/components/SplashEntry.vue'

export default {
  name: 'Index',
  components: {
    SplashLogo,
    SplashEntry
  },
  data: () => ({
    currentEntryFinished: false,
    currentEntry: null,
    nextEntry: null,
    windowResizeTimeout: null,
    entryResetIsPending: false,
    lastEntryShownAt: Date.now()
  }),
  head () {
    const { nextEntry } = this
    const link = []
    if (nextEntry) {
      link.push({ rel: 'prefetch', href: `${this.$imagesRoot}/${this.nextEntry.finalImagePath}/full.jpg` })
    }
    return {
      link
    }
  },
  computed: {
    ...mapState(['shouldShowSplashLogo', 'menuIsOpen', 'homeCurrentPage']),
    shouldShowEntry () {
      const { shouldShowSplashLogo, currentEntry, entryResetIsPending, menuIsOpen } = this
      return !shouldShowSplashLogo && currentEntry && !entryResetIsPending && !menuIsOpen
    }
  },
  watch: {
    'currentEntry.color': {
      handler (color) {
        this.setCurrentColor(color)
      },
      immediate: true
    }
  },
  async asyncData ({ $axios, store, redirect }) {
    const { homeCurrentPage } = store.state
    const response = await $axios({
      method: 'GET',
      url: '/list',
      params: {
        page: homeCurrentPage,
        size: 1,
        fetchNext: 1
      }
    })
    const { data } = response
    const [currentEntry, nextEntry] = data
    return {
      currentEntry,
      nextEntry,
      currentEntryFinished: false
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    ...mapActions(['disableSplashLogo', 'setHomeCurrentPage', 'setCurrentColor']),
    handleWindowResize () {
      this.entryResetIsPending = true
      clearTimeout(this.windowResizeTimeout)
      this.windowResizeTimeout = setTimeout(this.resetCurrentEntry, 200)
    },
    async resetCurrentEntry () {
      const { currentEntry } = this
      this.currentEntry = null
      await this.$nextTick()
      this.currentEntry = currentEntry
      this.entryResetIsPending = false
    },
    handleSplashLogoGone () {
      this.disableSplashLogo()
    },
    async handleEntryFinished () {
      this.currentEntryFinished = true
      const nextPage = this.nextEntry ? this.homeCurrentPage + 1 : 1
      this.setHomeCurrentPage(nextPage)
      const {
        currentEntry,
        nextEntry
      } = await this.$options.asyncData(this.$root.$options.context)
      this.currentEntry = currentEntry
      this.nextEntry = nextEntry
      this.currentEntryFinished = false
      this.lastEntryShownAt = Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.splash-logo {
  transform: rotate(-90deg) translateX(3.5vh);
}
</style>
