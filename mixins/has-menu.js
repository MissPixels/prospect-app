import { mapState, mapActions } from 'vuex'

import { transition as t } from '~/utils/transitions'
import Menu from '~/components/Menu.vue'

export default {
  components: { Menu },
  methods: {
    ...mapActions(['openMenu', 'closeMenu']),
    async menuEnter (el, done) {
      await this.$anime(t({
        targets: el,
        opacity: [0, 1]
      })).finished
      done()
    },
    async menuLeave (el, done) {
      await this.$anime(t({
        targets: el,
        opacity: 0
      })).finished
      done()
    }
  },
  computed: {
    ...mapState(['menuIsOpen'])
  }
}
