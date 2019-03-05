<template>
  <header>
    <nav class="main-menu">
      <button
        class="btn-open-menu"
        @click="$emit('open-menu')"
      >
        <IconBase
          width="30"
          height="30"
        >
          <IconMenuOpen />
        </IconBase>
      </button>
    </nav>
    <nuxt-link
      to="/"
      class="link-home"
      aria-label="Retourner à la page d'accueil"
    >
      <Logo class="logo" />
    </nuxt-link>
  </header>
</template>

<script>
import Logo from './Logo.vue'
import IconBase from './IconBase.vue'
import IconMenuOpen from './IconMenuOpen.vue'

export default {
  name: 'Header',
  components: {
    Logo,
    IconBase,
    IconMenuOpen
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  text-align: center;
  position: relative;

  @include breakpoint(sm) {
    text-align: left;
  }
}

.main-menu {
  display: flex;
  align-items: center;
  float: left;
  height: 100%;
  position: absolute;

  @include breakpoint(sm) {
    position: static;
    margin-right: $spacer;
  }
}

.link-home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @include breakpoint(sm) {
    align-items: flex-start;
  }
}

.logo {
  height: 100%;
  max-height: 30px;
  display: block;
  padding-bottom: 5px;
}
</style>
