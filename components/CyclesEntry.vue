<template>
  <div
    v-observe-visibility="{
      callback: handleVisibilityChanged,
      once: true,
      intersection: {
        threshold: 0.3,
      },
    }"
  >
    <nuxt-link :to="{ name: 'gisement-slug', params: { slug: entry.slug } }">
      <img
        ref="image"
        class="image"
        :class="{
          'is-visible': canShow
        }"
        :src="thumbUrl"
        :alt="entry.description"
        @load="handleImageLoaded"
      >
    </nuxt-link>
  </div>
</template>

<script>
import { transition as t } from '~/utils/transitions'
import hasEntry from '~/mixins/has-entry'

export default {
  name: 'CyclesEntry',
  mixins: [hasEntry],
  props: {
    entry: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: () => ({
    imageIsLoaded: false,
    isVisible: false
  }),
  computed: {
    canShow () {
      return this.imageIsLoaded && this.isVisible
    }
  },
  watch: {
    canShow (canShow) {
      if (canShow) {
        this.enter()
      }
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
    },
    async enter () {
      const delay = Math.round(Math.random() * 200) + 100
      await this.$anime(t({
        targets: this.$refs['image'],
        opacity: [0, 1],
        duration: 300,
        delay
      })).finished
    },
    handleImageLoaded () {
      this.imageIsLoaded = true
    },
    handleVisibilityChanged (isVisible) {
      this.isVisible = isVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  max-width: 100%;
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }
}
</style>
