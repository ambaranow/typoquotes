export default function preserveParts (text, exceptions) {
  const parts = new Map()
  exceptions.map(pattern => {
    text = text.replace(pattern, (match) => {
      const code = String(Math.random()).substr(2)
      parts.set(code, match)
      return `{${code}}`
    }
    )
  }
  )
  return {
    text,
    parts
  }
}
