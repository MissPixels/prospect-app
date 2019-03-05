<template>
  <div class="splash-entry">
    <img
      ref="image"
      class="image"
      :src="imageUrl"
      :alt="entry.description"
      @load="handleImageLoaded"
    >
    <div
      ref="poem"
      :style="{
        color: `rgb(${entryRgb})`,
      }"
      class="poem"
    >
      <div
        v-for="(verse, i) in verses"
        :key="`${entry.id}_verse${i}`"
      >
        <p
          ref="verse"
          class="verse"
        >
          <span>{{ verse }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { transition as t } from '~/utils/transitions'
import { sleep } from '~/utils/helpers'
import hasEntry from '~/mixins/has-entry'

export default {
  name: 'SplashEntry',
  mixins: [hasEntry],
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageLoaded () {
      this.startAnimation()
    },
    async startAnimation () {
      await this.$nextTick()
      const $image = this.$refs.image
      const $poem = this.$refs.poem
      const $verses = this.$refs.verse
      const imageWidth = $image.offsetWidth
      const poemWidth = $poem.offsetWidth
      const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const baseWidth = imageWidth > poemWidth ? imageWidth : poemWidth
      const lateralMargin = Math.ceil((windowWidth - imageWidth) / 2)
      const offsetRight = baseWidth + lateralMargin + 10
      // Show image
      this.$anime(t({
        targets: $image,
        duration: 300,
        scale: [0.95, 1],
        opacity: [0, 1],
        easing: 'easeOutCubic'
      }))
      // Pause
      await sleep(2000)
      // Show verses
      await Promise.all($verses.map(($verse, index) => {
        const delay = index * 2000
        return this.$anime(t({
          targets: $verse,
          duration: 8000,
          translateX: [`${offsetRight}px`, 0],
          delay,
          easing: 'easeOutCubic',
          begin: () => {
            $verse.style.opacity = 1
            $verse.style.minWidth = `${imageWidth}px`
          }
        })).finished
      }))
      // Pause
      await sleep(2000)
      // Hide verses
      await Promise.all($verses.map(($verse, index) => {
        const delay = index * 2000
        const offset = lateralMargin + $verse.offsetWidth
        return this.$anime(t({
          targets: $verse,
          duration: 8000,
          translateX: `-${offset}px`,
          delay,
          easing: 'easeInCubic'
        })).finished
      }))
      // Pause
      await sleep(2000)
      // Cleanup style attributes to prepare for next entry
      $verses.forEach($verse => $verse.removeAttribute('style'))
      // Hide image
      await this.$anime(t({
        targets: this.$refs.image,
        duration: 300,
        scale: [1, 0.95],
        opacity: [1, 0],
        easing: 'easeOutCubic'
      })).finished
      // Trigger end event
      this.$emit('finished')
    }
  }
}
</script>

<style lang="scss" scoped>
.splash-entry {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.splash-entry .image {
  opacity: 0;
  max-width: 90%;
  height: auto;
}

.poem {
  @include entry-font();

  position: absolute;
  bottom: 20%;
  text-align: left;
}

.verse {
  opacity: 0;
  margin: 10px 0;
  display: inline-block;
}

.verse span {
  background: $white;
  padding: $spacer/2 $spacer;
}
</style>
