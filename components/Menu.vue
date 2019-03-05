<template>
  <nav
    class="menu"
    :style="menuStyle"
  >
    <header>
      <button
        class="btn-close-menu"
        @click="closeMenu"
      >
        <IconBase
          width="30"
          height="30"
        >
          <IconMenuClose />
        </IconBase>
      </button>
    </header>
    <ul class="menu-items">
      <li
        v-for="item in items"
        :key="item.title"
        class="menu-item"
      >
        <nuxt-link :to="item.to">
          {{ item.title }}
        </nuxt-link>
      </li>
      <li>
        <div class="social-icons">
          <a
            :href="instagramUrl"
            rel="noopener"
            target="_blank"
          >
            <IconInstagram class="social-icon social-icon--instagram" />
          </a>
          <a
            :href="twitterUrl"
            rel="noopener"
            target="_blank"
          >
            <IconTwitter class="social-icon social-icon--twitter" />
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { TWITTER_URL, INSTAGRAM_URL } from '~~/config'
import IconBase from './IconBase.vue'
import IconMenuClose from './IconMenuClose.vue'
import IconInstagram from './IconInstagram.vue'
import IconTwitter from './IconTwitter.vue'

export default {
  name: 'Menu',
  components: {
    IconBase,
    IconMenuClose,
    IconInstagram,
    IconTwitter
  },
  data: () => ({
    items: [
      { title: 'Index', to: '/' },
      { title: 'Gisement', to: '/gisement' },
      { title: 'Cycle', to: '/cycle' },
      { title: 'À propos', to: '/a-propos' }
    ],
    twitterUrl: TWITTER_URL,
    instagramUrl: INSTAGRAM_URL
  }),
  computed: {
    ...mapState(['currentColor']),
    ...mapGetters(['currentColorYiq']),
    menuStyle () {
      const { currentColor, currentColorYiq } = this
      return {
        backgroundColor: `rgb(${currentColor.join(',')})`,
        color: currentColorYiq,
        fill: currentColorYiq
      }
    }
  },
  methods: {
    ...mapActions(['closeMenu'])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $white;
  display: grid;
  grid-template-areas: "menu-top" "menu-content";
  grid-template-rows: 7vh 1fr;

  header {
    grid-area: menu-top;
  }

  .btn-close-menu {
    height: 100%;
    color: inherit;
    margin-top: $spacer / 2;
    margin-left: $spacer;
  }

  .menu-items {
    grid-area: menu-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .menu-items .menu-item {
    font-size: 2em;
    margin: $spacer 0;
  }

  .menu-items .menu-item a {
    color: inherit;

    &.nuxt-link-exact-active {
      opacity: 0.5;

      &:hover {
        cursor: not-allowed;
      }
    }
  }

  .menu-items .social-icons {
    margin-top: $spacer * 8;
  }

  .menu-items .social-icons .social-icon {
    height: 3em;
    width: 3em;
    margin: 0 $spacer;
    fill: inherit;

    &.social-icon--instagram {
      width: 2.7em;
    }
  }
}
</style>
