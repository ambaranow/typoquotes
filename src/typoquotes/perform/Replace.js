export default function performReplace (text, table) {
  table.forEach((o, i) => {
    text = text.replace(i, o)
  })
  return text
}
