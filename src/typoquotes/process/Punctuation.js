let performReplace = require('./../perform/Replace')
let preserveParts = require('./../preserve/Parts')
let restoreParts = require('./../restore/Parts')

export default function processPunctuation (text, availActions) {
  // Двойные пробелы
  text = text.replace(/( |\u00a0){2,}/g, ' ')
  // Двойные табы
  text = text.replace(/(\t){2,}/g, '\t')
  // Двойные точки
  text = text.replace(/([^.])(\.{2})([^.])/g, '$1.$3') // try double dots
  text = text.replace(/(\.){4,}/g, '.')
  // Двойные и более запятые, двоеточия и точки с запятой
  text = text.replace(/(,|:|;){2,}/g, '$1')
  // Двойные и больше энтеры
  text = text.replace(/(\s*)\n{2,}(\s*)/g, '\n') // Абзацы
  text = text.replace(/(\u2028|\u2029){2,}/g, '\u2028'); // Перенос строки

  const table = new Map()
  table.set(/([.,!?:)])(?=[^ \n"'.,;!?&:\])<»”{)])/g, '$1 ')
  table.set(/[\s]*(?=[.,;!?:])/g, '')
  table.set(/\s([-\u2013\u2014])/g, ' $1')
  if (availActions.includes('nbsp')) {
    table.set(/\s([-\u2013\u2014])/g, '&nbsp;$1')
  }
  let {
    text: preservedText,
    parts
  } = preserveParts(text, [
    /[\d]+([.,][\d]+)+/g,
    /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/gi,
    /((([a-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[a-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[a-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/gi,
    /[:;.]['_-]{0,2}[.,edpobnsu*#@|()&$308ехорвъэ]/gi
  ])
  preservedText = performReplace(preservedText, table)
  return restoreParts(preservedText, parts)
}
