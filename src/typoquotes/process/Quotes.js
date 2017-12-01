/*
* \u00ab => «
* \u00bb => »
*
*/
export default function processQuotes (text) {
  text = text.replace(/(^|\n|\s|—|-|\()"/g, '$1«')
    .replace(/"($|\n|\s|—|-|\.|,|!|\?|:|;|\))/g, '»$1')
    .replace(/«\)/g, '»)')
    .replace(/«( ?)/g, '«')
    .replace(/( ?)»/g, '»')
    .replace(/>"/g, '>«')
    .replace(/"</g, '»<')
    .replace(/«""/g, '«««')
    .replace(/«"/g, '««')
    .replace(/""»/g, '»»»')
    .replace(/"»/g, '»»')
    .replace(/("{2}|"»)/g, '»»')
    .replace(/$"/g, '«')
    .replace(/([A-Za-zа-яА-ЯёЁ])'/g, '$1’')

  text = text.replace(/[a-zA-ZА-яёЁ]"-/g, '$1»-')
    .replace(/-"[a-zA-ZА-яёЁ]/g, '-«$1');
  text = text.replace(/(^[^«»]*)"/g, '$1«')
    .replace(/"([^«»]*$)/g, '»$1')
    .replace(/«([^«»]*)"/g, '«$1»')
    .replace(/"([^«»]*)»/g, '«$1»')
  return text
}
