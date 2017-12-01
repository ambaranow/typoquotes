let performReplace = require('./../perform/Replace')

export default function processAngles (text) {
  const table = new Map([
    [/(\d)\*([\D])/g, '$1\u{00b0}$2'], // Degree °
    [/(\d)'/g, '$1\u{2032}'], // Prime ′
    [/(^[^"]*\d)"([^"]*$)/g, '$1\u{2033}$2'], // Double Prime ″
    [/("[^"]*\d)"([^"]*?")/g, '$1\u{2033}$2']
  ])
  return performReplace(text, table)
}
