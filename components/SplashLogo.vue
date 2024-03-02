<template>
  <Logo class="logo" />
</template>

<script>
import { transition as t } from '~/utils/transitions'
import { sleep } from '~/utils/helpers'

import Logo from './Logo.vue'

export default {
  name: 'SplashLogo',
  components: { Logo },
  data: () => ({
    $letters: []
  }),
  async mounted () {
    this.$letters = [...this.$el.querySelectorAll('.letter')]
    await this.$nextTick()
    await this.transitionIn()
    await sleep(1500)
    await this.transitionOut()
    this.$emit('gone')
  },

  methods: {
    transitionIn () {
      return new Promise(async (resolve) => {
        await Promise.all(this.$letters.map(($letter, index) => {
          const delay = index * 100
          return this.$anime(t({
            targets: $letter,
            translateY: [-30, 0],
            opacity: [0, 1],
            delay
          })).finished
        }))
        resolve()
      })
    },
    transitionOut () {
      return new Promise(async (resolve) => {
        await Promise.all(this.$letters.map(($letter, index) => {
          const delay = index * 100
          return this.$anime(t({
            targets: $letter,
            translateY: [0, 30],
            opacity: [1, 0],
            delay
          })).finished
        }))
        resolve()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-height: 4em;
  display: inline-block;
  text-align: center;
  overflow: overlay;

  ::v-deep .letter {
    opacity: 0;
    display: inline-block;
  }
}

</style>
