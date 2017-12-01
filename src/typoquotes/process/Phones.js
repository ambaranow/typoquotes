export default function processPhones (text, lang) {
  text = text.replace(/((тел\.|телефон?[а-я]{1,3})(:?)(\s+?))?(\+7|8)(\s+)?(\(?)(\d{3})(\)?)(\s+)?(\d{3})(\u2012|\u2013|\u2014|\u002d|\u02d7|\u2212)?(\d{2})(\u2012|\u2013|\u2014|\u002d|\u02d7|\u2212)?(\d{2})([^\w])/gi, '$2$3 <span data-typo="" class="nowrap">+7($8) $11\u2013$13\u2013$15</span>$16')
  return text
}
