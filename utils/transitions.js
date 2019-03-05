export const CUSTOM_EASING = [0.000, 0.655, 1.000, 0.315]

export const transition = (options) => ({
  duration: 200,
  elasticity: 0,
  easing: 'easeOutQuad',
  ...options
})
