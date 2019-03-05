export default {
  computed: {
    fullUrl () {
      return `${process.env.BASE_URL}${this.$route.path}`
    }
  }
}
