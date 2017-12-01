export default function processNbsps (text) {
  text = text.replace(/(\s)\/(\s)/g, '&nbsp;/&nbsp;')
  text = text.replace(/((^|[\s])[a-zа-яёіїєґ'′]{1,2})[\s]/gi, '$1&nbsp;')
  text = text.replace(/(\d)([a-zа-я])/g, '$1&nbsp;$2')
  text = text.replace(/(\d)(\s)(\W)/g, '$1&nbsp;$3')
  text = text.replace(/(тыс|млн|млрд|трлн|кв\.)(\s)(р\.|руб|кило|тон|кв(\.)?|м(\.)?)/gi, '$1&nbsp;$3')
  var preps = ['без', 'безо', 'в', 'во', 'вне', 'для', 'до', 'за', 'из', 'изо', 'из-за', 'из-под',
    'к', 'ко', 'на', 'над', 'о', 'об', 'обо', 'около', 'от', 'ото', 'по', 'по-над', 'под',
    'подо', 'при', 'про', 'с', 'со', 'сквозь', 'у', 'через', 'а', 'но', 'и', 'да', 'или', 'иль',
    'либо', 'не', 'ни', 'a', 'the', 'at', 'to', 'or']
  for (var i = 0; i < preps.length; i++) {
    var tmp = new RegExp('( |^|\\(|«|„|\u00a0)(' + preps[i] + ') ', 'ig')
    text = text.replace(tmp, '$1$2&nbsp;')
  }
  // люди ФИО
  // И.И.Иванов
  text = text.replace(/([А-Я]\.)(\s)?([А-Я]\.)(\s)?([А-Я][А-Яа-я]*)/g, '$1&nbsp;$3&nbsp;$5')
  // Иванов И.И.
  text = text.replace(/([А-Я][А-Яа-я]*)(\s)?([А-Я]\.)(\s)?([А-Я]\.)/g, '$1&nbsp;$3&nbsp;$5')
  return text
}
