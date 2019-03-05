<template>
  <section
    ref="container"
    class="container"
    :class="{
      'is-desktop': !$isMobile
    }"
  >
    <div
      v-for="(entry, index) in entries"
      :key="entry.finalImagePath"
      ref="entry-container"
      class="list-entry-container"
      @mouseover="handleMouseover(index)"
      @mouseout="handleMouseout(index)"
    >
      <nuxt-link :to="{ name: 'gisement-slug', params: { slug: entry.slug } }">
        <ListEntry
          ref="entry"
          class="entry"
          :entry="entry"
          :has-mouseover="isActiveEntry(index)"
          @became-visible="handleBecameVisible(entry)"
        />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

import hasSeo from '~/mixins/has-seo'
import hasInfiniteScroll from '~/mixins/has-infinite-scroll'

import ListEntry from '~/components/ListEntry'

export default {
  name: 'Gisement',
  components: {
    ListEntry
  },
  mixins: [hasSeo, hasInfiniteScroll],
  head () {
    const { fullUrl } = this
    const title = 'Gisement'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${title} - Pröspect` },
        { hid: 'og:url', property: 'og:url', content: fullUrl }
      ]
    }
  },
  data: () => ({
    entries: [],
    activeEntryIndex: 0
  }),
  watch: {
    activeEntryIndex (index) {
      if (!this.$isMobile) return
      this.$refs['entry-container'][index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  },
  async asyncData ({ $axios, store, app: { $isMobile } }) {
    const itemsPerPage = $isMobile ? 3 : 10
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
  mounted () {
    this.addInfiniteScrollListener()
  },
  methods: {
    ...mapActions(['setCurrentColor']),
    async fetchNextPage () {
      this.fetchingEntries = true
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
      this.fetchingEntries = false
    },
    isActiveEntry (index) {
      return index === this.activeEntryIndex
    },
    handleBecameVisible ({ color }) {
      this.setCurrentColor(color)
    },
    handleMouseover (index) {
      if (this.$isMobile) return
      this.activeEntryIndex = index
    },
    handleMouseout () {
      if (this.$isMobile) return
      this.activeEntryIndex = null
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: $spacer * 10;

  .list-entry-container {
    height: 85vh;
    padding-top: 3vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    /deep/ img {
      max-height: 85vh;
    }

    .entry {
      max-height: 100%;
    }
  }
  // Desktop
  &.is-desktop {
    display: block;
    margin: 0 auto;

    @include breakpoint(md) {
      width: map-get($breakpoints, md);
    }

    @include breakpoint(lg) {
      width: map-get($breakpoints, lg);
    }

    .list-entry-container {
      height: auto;
      margin: $spacer;

      /deep/ .poem {
        position: relative;
      }

      @include breakpoint(md) {
        display: inline-block;
        float: left;
        max-width: 100%;

        /deep/ .verse {
          position: absolute;
          left: 0;

          &:nth-child(2) {
            top: 2em;
          }
        }

        &:nth-child(odd) {
          float: right;

          /deep/ .verse {
            left: initial;
            right: 0;
          }
        }
      }

      @include breakpoint(md) {
        max-width: 460px;
      }

      @include breakpoint(lg) {
        max-width: 100%;
      }
    }
  }
}
</style>
