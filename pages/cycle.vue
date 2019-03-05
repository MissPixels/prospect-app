<template>
  <section
    class="cycles"
    :class="{ 'all-images-loaded': imagesAreLoaded }"
  >
    <template v-for="(entry, index) in entries">
      <div
        :key="entry._id.$oid"
        class="entry-container"
      >
        <CyclesEntry
          :key="entry._id.$oid"
          :entry="entry"
          :index="index"
        />
      </div>
    </template>
  </section>
</template>

<script>
import Bricks from 'bricks.js'

import { sleep } from '~/utils/helpers'
import hasSeo from '~/mixins/has-seo'
import hasInfiniteScroll from '~/mixins/has-infinite-scroll'

import CyclesEntry from '~/components/CyclesEntry.vue'

export default {
  name: 'Cycles',
  components: { CyclesEntry },
  mixins: [hasSeo, hasInfiniteScroll],
  head () {
    const { fullUrl } = this
    const title = 'Cycles'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${title} - Pröspect` },
        { hid: 'og:url', property: 'og:url', content: fullUrl }
      ]
    }
  },
  data: () => ({
    imagesAreLoaded: false,
    grid: null
  }),
  async asyncData ({ $axios, store, app: { $isMobile } }) {
    const itemsPerPage = 25
    const scrollTreshold = $isMobile ? 0.85 : 0.65
    const response = await $axios({
      method: 'GET',
      url: '/list',
      params: {
        page: 1,
        size: itemsPerPage
      }
    })
    const { data } = response
    return {
      entries: data,
      itemsPerPage,
      scrollTreshold
    }
  },
  async mounted () {
    const { default: imagesLoaded } = await import('imagesloaded')
    this.imagesLoaded = imagesLoaded
    imagesLoaded(this.$el, () => {
      // Init brick.js
      const instance = Bricks({
        container: this.$el,
        packed: 'packed',
        sizes: [
          { columns: 5, gutter: 10 },
          { mq: '600px', columns: 6, gutter: 10 },
          { mq: '650px', columns: 7, gutter: 10 },
          { mq: '767px', columns: 6, gutter: 10 },
          { mq: '992px', columns: 7, gutter: 10 },
          { mq: '1200px', columns: 9, gutter: 10 }
        ]
      })
      instance
        .pack()
        .resize(true)
      this.grid = instance
      this.imagesAreLoaded = true
      // Load as many images as needed to fill the viewport's height
      const fetchUntivViewportFull = async () => {
        await sleep(400)
        const keepFetching = await this.checkScrollAndFetchNextPage()
        if (keepFetching && this.hasNextPage) {
          fetchUntivViewportFull()
        } else if (this.hasNextPage) {
          this.addInfiniteScrollListener()
        }
      }
      fetchUntivViewportFull()
    })
  },
  methods: {
    async fetchNextPage () {
      this.isFetchingPage = true
      const response = await this.$axios({
        method: 'GET',
        url: '/list',
        params: {
          page: this.nextPage++,
          size: this.itemsPerPage
        }
      })
      const { data } = response
      if (data.length === 0) {
        this.hasNextPage = false
      } else {
        this.entries = this.entries.concat(data)
      }
      this.isFetchingPage = false
      await this.$nextTick()
      this.imagesLoaded(this.$el, () => {
        this.grid.pack()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cycles {
  margin: 0 auto;
  opacity: 0;
  overflow-y: hidden;

  &.all-images-loaded {
    opacity: 1;
  }
}

.entry-container {
  width: 50px;
  opacity: 0;

  @include breakpoint(xs) {
    width: 65px;
  }

  @include breakpoint(sm) {
    width: 110px;
  }

  &[data-packed] {
    opacity: 1;
  }
}
</style>
