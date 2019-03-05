<template>
  <div
    v-observe-visibility="{
      callback: handleVisibilityChanged,
      intersection: {
        threshold: 0.3,
      },
    }"
    class="list-entry"
    :class="{
      'is-visible': isVisible,
      'has-mouseover': hasMouseover,
    }"
    :style="{
      zIndex: hasMouseover ? 10 : 1
    }"
  >
    <div
      ref="background"
      class="background-image"
      :style="{
        backgroundImage: `url(${$imagesRoot}/${entry.finalImagePath}/full.jpg)`
      }"
    >
      <img
        ref="image"
        class="image"
        :src="`${$imagesRoot}/${entry.finalImagePath}/full.jpg`"
        :alt="entry.description"
        @load="handleImageLoaded"
      >
      <div
        :style="{
          color: `rgb(${entryRgb})`,
          backgroundColor: `rgba(${entryRgb}, .6)`
        }"
        class="poem-container"
      >
        <div class="poem">
          <span
            v-for="(verse, i) in verses"
            ref="verse"
            :key="`${entry.id}_verse${i}`"
            class="verse"
          >
            &nbsp;{{ verse }}&nbsp;<br>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transition as t } from '~/utils/transitions'
import hasEntry from '~/mixins/has-entry'

export default {
  name: 'ListEntry',
  mixins: [hasEntry],
  props: {
    entry: {
      type: Object,
      required: true
    },
    hasMouseover: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      imageIsLoaded: false,
      isVisible: this.$isMobile,
      hasTransitioned: false
    }
  },
  watch: {
    imageIsLoaded (imageIsLoaded) {
      this.$refs.background.scrollLeft = Math.random() * (this.$refs.background.offsetWidth * 2)
      if (!this.hasTransitioned && imageIsLoaded && this.isVisible) {
        this.transitionIn()
      }
    },
    isVisible (isVisible) {
      if (!this.hasTransitioned && isVisible && this.imageIsLoaded) {
        this.transitionIn()
      }
    }
  },
  methods: {
    transitionIn () {
      this.hasTransitioned = true
      this.$anime(t({
        targets: this.$el,
        opacity: [0, 1],
        translateY: [100, 0],
        delay: 100
      }))
    },
    handleImageLoaded () {
      this.imageIsLoaded = true
    },
    handleVisibilityChanged (isVisible, entry) {
      if (isVisible) {
        this.$emit('became-visible')
        if (!this.isVisible) {
          this.isVisible = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-entry {
  text-align: center;
  opacity: 0;

  .background-image {
    position: relative;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @include breakpoint(md) {
      overflow-x: initial;
    }
  }

  &:not(.is-visible) {
    min-height: 500px;
  }

  .image {
    max-width: 100%;
    visibility: hidden;
  }

  .poem-container {
    position: absolute;
    width: 300%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 $spacer;
    transition: opacity $transitions-duration;

    @media (max-width: 991px) {
      background-color: transparent !important;
    }

    @include breakpoint(md) {
      opacity: 0;
      width: auto;
      align-items: initial;
    }
  }

  &.has-mouseover .poem-container {
    opacity: 1;
  }

  .poem {
    @include entry-font();

    text-align: left;
  }

  .verse {
    background-color: $white;
    line-height: 1.7;
    white-space: nowrap;
  }
}
</style>
