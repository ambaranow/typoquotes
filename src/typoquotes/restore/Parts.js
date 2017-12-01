export default function restoreParts (text, parts) {
  parts.forEach((o, i) => {
    text = text.replace(`{${i}}`, o)
  }
  )
  return text
}
