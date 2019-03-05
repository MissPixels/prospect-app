import { nl2br } from '~/utils/helpers'

export default {
  methods: {
    nl2br (str) {
      return nl2br(str)
    }
  },
  computed: {
    verses () {
      return this.entry.poem.split('\n')
    },
    entryRgb () {
      return this.entry.color.join(',')
    },
    imageUrl () {
      return `${this.$imagesRoot}/${this.entry.finalImagePath}full.jpg`
    },
    thumbUrl () {
      return `${this.$imagesRoot}/${this.entry.finalImagePath}thumb.jpg`
    }
  }
}
