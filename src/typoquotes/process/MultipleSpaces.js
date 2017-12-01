export default function processMultipleSpaces (text) {
  return text.replace(/[\s]{2,}/g, ' ')
}
