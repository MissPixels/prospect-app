<template>
  <a
    rel="noopener"
    target="_blank"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'ExternalLink'
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
