export const nl2br = str => str.replace(/\n/g, '<br>')

export const yiq = (rgb, options = {}) => {
  const white = options.white || '#fff'
  const dark = options.dark || '#000'
  const [r, g, b] = rgb
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq >= 128 ? dark : white
}

export const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds))
