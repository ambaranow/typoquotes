export default function processHellips (text) {
  text = text.replace(/\.{3}/g, '\u{2026}')
  return text
}
