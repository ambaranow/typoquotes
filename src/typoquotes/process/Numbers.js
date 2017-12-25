export default function processNumbers (text, lang) {
  // Цифры на разряды 10 000
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6&nbsp;$7&nbsp;$8&nbsp;$9')
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6&nbsp;$7&nbsp;$8')
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6&nbsp;$7')
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6')
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5')
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{1,3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4')
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029|>)(\d{2,3}) ?(\d{3})/g, '$1$2&nbsp;$3')
  return text
}
