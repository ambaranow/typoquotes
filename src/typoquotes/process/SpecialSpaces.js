let performReplace = require('./../perform/Replace')

export default function processSpecialSpaces (text) {
  const table = new Map([
    [/([\u2116\u00a7])[\s]*(?=[\d])/g, '$1&nbsp;'], // non-breaking space №_123
    [/([\d])[\s]*(?=\u00b0[CСF])/g, '$1 '],
    [/([\d])[\s]*(?=%)/g, '$1']
  ])
  return performReplace(text, table)
}
