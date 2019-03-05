<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-label="iconName"
    role="presentation"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {

  name: 'IconBase',

  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
