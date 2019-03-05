export default {
  data: () => ({
    isFetchingPage: false,
    nextPage: 2,
    hasNextPage: true,
    scrollTreshold: 0.8,
    infiniteScrollDebounce: null
  }),
  watch: {
    hasNextPage (hasNextPage) {
      if (!hasNextPage) {
        this.removeInfiniteScrollListener()
      }
    }
  },
  beforeDestroy () {
    this.removeInfiniteScrollListener()
  },
  methods: {
    addInfiniteScrollListener () {
      window.addEventListener('scroll', this.handleInfiniteScrollEvent)
    },
    removeInfiniteScrollListener () {
      window.removeEventListener('scroll', this.handleInfiniteScrollEvent)
    },
    handleInfiniteScrollEvent (scrollTop) {
      clearTimeout(this.infiniteScrollDebounce)
      this.infiniteScrollDebounce = setTimeout(() => this.checkScrollAndFetchNextPage(scrollTop), 200)
    },
    /**
     * Checks scroll position and trigger next page fetch if needed
     *
     * @return     {Promise}  Promise that resolves with:
     *                        - undefined if a fetch is still pending
     *                        - true if a page has been fetched
     *                        - false if current scroll position does not require next page
     */
    async checkScrollAndFetchNextPage () {
      if (this.isFetchingPage) {
        return
      }
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const documentHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight
      const scrollBottom = windowHeight + scrollTop
      if (scrollBottom / documentHeight >= this.scrollTreshold) {
        await this.fetchNextPage()
        return true
      }
      return false
    }
  }
}
