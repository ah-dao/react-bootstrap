export function stringToHTML(str) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'text/html')
  return doc.body
}

export function rdmRgbColor() {
  // 随机生成RGB颜色
  let arr = [0, 0, 0]
  arr = arr.map(() => Math.floor(Math.random() * 256))
  const [r, g, b] = arr
  // rgb颜色
  const color = `rgb(${r},${g},${b})`
  // 16进制颜色
  // const color = `#${r.toString(16).length > 1 ? r.toString(16)
  // : `0${r.toString(16)}`}${g.toString(16).length > 1 ? g.toString(16) : `0${g.toString(16)}`}${
  // b.toString(16).length > 1 ? b.toString(16) : `0${b.toString(16)}`}`
  return color
}
