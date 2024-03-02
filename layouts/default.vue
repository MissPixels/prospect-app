<template>
  <main
    :class="$route.name"
  >
    <transition
      :css="false"
      @enter="headerEnter"
    >
      <Header
        v-if="showHeader"
        class="header"
        @open-menu="openMenu"
      />
    </transition>
    <transition
      :css="false"
      @enter="menuEnter"
      @leave="menuLeave"
    >
      <Menu v-if="menuIsOpen" />
    </transition>
    <nuxt class="content" />
  </main>
</template>

<script>
import { mapState } from 'vuex'

import hasMenu from '~/mixins/has-menu.js'
import { transition as t } from '~/utils/transitions'
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  mixins: [hasMenu],
  computed: {
    ...mapState(['shouldShowSplashLogo']),
    showHeader () {
      const { shouldShowSplashLogo, $route } = this
      return !(shouldShowSplashLogo && $route.name === 'index')
    }
  },
  methods: {
    headerEnter (el, done) {
      this.$anime(t({
        targets: el,
        opacity: [0, 1],
        complete: done
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  overflow-x: hidden;
  display: grid;
  grid-template-areas: "header" "content";
  grid-template-rows: 60px 1fr;

  &.a-propos {
    @media (min-width: 992px) and (min-height: 750px) {
      grid-template-rows: 1fr;
    }
  }

  &.index {
    height: 100vh;
    overflow-y: hidden;
  }

  &.image-id {
    min-height: 100vh;
  }
}

.header {
  grid-area: header;
  position: fixed;
  z-index: 10;
  height: 60px;
  background: $white;
  padding-left: $spacer;
}

.content {
  grid-area: content;

  ::v-deep img {
    max-height: 90vh;
  }
}
</style>
