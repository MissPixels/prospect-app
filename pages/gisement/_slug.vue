<template>
  <section class="container">
    <div class="image-col">
      <div>
        <img
          ref="image"
          class="image"
          :src="imageUrl"
          :alt="entry.description"
          @click="handleImageClicked"
        >
      </div>
    </div>
    <div
      class="poem-col"
      :style="{ color: `rgb(${entryRgb})` }"
    >
      <span
        v-for="(verse, i) in verses"
        ref="verse"
        :key="`verse${i}`"
        class="verse"
      >
        &nbsp;{{ verse }}&nbsp;<br>
      </span>
      <div class="icons">
        <nuxt-link
          to="/gisement"
          aria-label="Retour au gisement"
        >
          <IconListing class="icon icon-listing" />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { saveAs } from 'file-saver'

import hasEntry from '~/mixins/has-entry'
import hasSeo from '~/mixins/has-seo'

import IconListing from '~/components/IconListing.vue'

export default {
  name: 'EntryDetails',
  components: {
    IconListing
  },
  mixins: [hasEntry, hasSeo],
  head () {
    const { imageUrl, fullUrl } = this
    const { finalImagePath, description } = this.entry
    const title = finalImagePath
      // Remove prefix
      .replace(/^[^/]+\/prospect-/i, '')
      // Remove extension
      .replace(/\.[a-z]+$/i, '')
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:title', property: 'og:title', content: `${title} - Pröspect` },
        { hid: 'og:image', property: 'og:image', content: imageUrl },
        { hid: 'og:url', property: 'og:url', content: fullUrl }
      ]
    }
  },
  async asyncData ({ $axios, params, error, store }) {
    const pageData = { entry: null }
    const response = await $axios({
      method: 'GET',
      url: `/one/${params.slug}`
    })
    const { data } = response
    if (!data) {
      error({ statusCode: 404, message: 'Image introuvable' })
    } else {
      store.dispatch('setCurrentColor', data.color)
      pageData.entry = data
    }
    return pageData
  },
  methods: {
    handleImageClicked () {
      if (this.$isMobile) return
      saveAs(this.imageUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include entry-font();
  text-align: center;
  padding: $spacer 0;

  @include breakpoint(md) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  & > div {
    padding: 0 $spacer;
  }

  .image-col {
    text-align: center;
    @include breakpoint(md) {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .image-col img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  .poem-col {
    margin: 0 auto;
    display: inline-block;
    text-align: left;
    position: relative;
    @include breakpoint(md) {
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .poem-col .icons {
    text-align: center;
    margin-top: $spacer * 3;

    @include breakpoint(md) {
      position: absolute;
      bottom: 0;
      align-self: flex-start;
    }
  }
  .poem-col .icons .icon {
    width: 30px;
    height: 30px;
    margin: 0 $spacer / 2;
  }
}
</style>
