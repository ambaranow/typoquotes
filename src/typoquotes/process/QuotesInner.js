/*
 * \u00ab => «
 * \u00bb => »
 * \u201c => “
 * \u201e => „
 *
 */

export default function processQuotesInner (text, lang) {
  function rl (i, j) { // r_leveled
    var b = ''
    var c = ''
    var d = ''
    if (i !== 0) {
      b = text.substring(0, i)
    }
    if (j !== text.length - 1) {
      d = text.substring(j + 1, text.length)
    }
    c = text.substring(i, j + 1)
    for (var k = 0; k < 32; ++k) {
      c = c.replace(/«([^«»]*)«([^»]*)»/g, '«$1„$2“')
      c = c.replace(/„([^„“]*)„([^“]*)“/g, '„$1‚$2‘')
    }
    return b + c + d
  };
  var level = 0
  for (var i = 0; i < text.length; ++i) {
    if (text.charAt(i) === '«') {
      ++level
      for (var j = i + 1; j < text.length; ++j) {
        if (text.charAt(j) === '«') {
          ++level
        }
        if (text.charAt(j) === '»') {
          --level
          if (level <= 0) {
            text = rl(i, j) // r_leveled
            i = j
            break
          }
        }
      }
      level = 0
    }
  }
  if (lang === 'en') {
    text = text
      .replace(/(»|’)(\.|,|!|\?)/g, '$2' + '$1')
      .replace(/«/g, '“')
      .replace(/»/g, '”')
  }
  // Восстанавливает англйиские сокращения, like don't, year's
  text = text.replace(/([A-z])”([A-z])/g, '$1’$2')
  text = text.replace(/«(\d+( |\xA0)[A-z])/g, '“$1')
  text = text.replace(/([A-z]( |\xA0)\d+)»/g, '$1”')
  // .»  →  ».
  text = text.replace(/([^.{2}])(\.{1}»)/g, '$1».')
  text = text.replace(/([^.{2}])(\.{1}”)/g, '$1”.')
  return text
}
