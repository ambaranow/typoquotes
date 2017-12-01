export default function processUnits (text, lang) {
  // Квадраты и кубы
  text = text.replace(/(\s)?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?2/gi, '$2²')
  text = text.replace(/(\s)?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?3/gi, '$2³')
  return text
}
