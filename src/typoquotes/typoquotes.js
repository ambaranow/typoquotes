const actions = [
  'quotes',
  'dashes',
  'angles',
  'dblspace',
  'specials',
  'mathchars',
  'punctuation',
  'specialspaces',
  'phones',
  'numbers',
  'nbsp',
  'hellip',
  'units'
]

const Typoquotes = class Typoquotes {
  constructor (params = {}) {
    params.actionlist = params.actionlist || actions
    params.lang = params.lang || 'ru'

    this.preserveParts = require('./preserve/Parts')
    this.restoreParts = require('./restore/Parts')
    this.processSpecials = require('./process/Specials')
    this.processMath = require('./process/Math')
    this.processMinuses = require('./process/Minuses')
    this.processPunctuation = require('./process/Punctuation')
    this.processSpecialSpaces = require('./process/SpecialSpaces')
    this.processAngles = require('./process/Angles')
    this.processMultipleSpaces = require('./process/MultipleSpaces')
    this.processQuotes = require('./process/Quotes')
    this.processQuotesInner = require('./process/QuotesInner')
    this.processDashes = require('./process/Dashes')
    this.processPhones = require('./process/Phones')
    this.processNumbers = require('./process/Numbers')
    this.processNbsps = require('./process/Nbsps')
    this.processHellips = require('./process/Hellips')
    this.processUnits = require('./process/Units')

    this.actions(params.actionlist)
    this.lang(params.lang)
    this.m = []
    this.tag = 'untypo'
    this.s = ''
    /** Используемые символы **/
    this.normsym = ['—', '«', '»', '…', '©', '®', '™', '←', '→', '↑', '↓', '↔', '°', '́', '×', '≠', '±', '↕', '‘', '’', '−', '–', '“', '”', '„', '≥', '≤', '§', '€', '£', '″', '√', '∫', '½', '¼', '¾', ' ', '‚', '¹', '²', '³', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞', '≈', '\'', '⁰', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁺', '⁻', '⁼', '⁽', '⁾', 'ⁿ', 'ⁱ', '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₊', '₋', '₌', '₍', '₎']
    this.htmlsym = ['mdash', 'laquo', 'raquo', 'hellip', 'copy', 'reg', 'trade', 'larr', 'rarr', 'uarr', 'darr', 'harr', 'deg', '#769', 'times', 'ne', 'plusmn', '#8597', 'lsquo', 'rsquo', 'minus', 'ndash', 'ldquo', 'rdquo', 'bdquo', 'ge', 'le', 'sect', 'euro', 'pound', 'Prime', 'radic', 'int', 'frac12', 'frac14', 'frac34', 'nbsp', 'sbquo', 'sup1', 'sup2', 'sup3', '#8531', '#8532', '#8533', '#8534', '#8535', '#8536', '#8537', '#8538', '#8539', '#8540', '#8541', '#8542', '#8776', 'quot', '#8304', '#8308', '#8309', '#8310', '#8311', '#8312', '#8313', '#8314', '#8315', '#8316', '#8317', '#8318', '#8319', '#8305', '#8320', '#8321', '#8322', '#8323', '#8324', '#8325', '#8326', '#8327', '#8328', '#8329', '#8330', '#8331', '#8332', '#8333', '#8334']
    /** Регулярки на имейлы и ссылки **/
    this.RegLink = this.r('([  \n\t\v]|^)(((ht|f)tps?://)?([\\-\\w]+:[\\-\\w]+@)?([0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(:\\d{1,5})?([?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?)([  \n\t\v]|$)', 'gi')
    this.RegMail = this.r("([  \n\t\v]|^)([\\-a-z0-9!#$%&'*+\\/=?^_`{|}~]+(\\.[\\-a-z0-9!#$%&'*+\\/=?^_`{|}~]+)*@([a-z0-9]([\\-a-z0-9]{0,61}[a-z0-9])?\.)*([a-z]{2,6}))([  \n\t\v]|$)", 'gi')
  }

  r (a, b) { return new RegExp(a, b) }

  actions (actionlist) {
    this._actions = actionlist
  }

  lang (lang) {
    let langs = ['ru', 'en']
    let ind = langs.indexOf(lang.toLowerCase())
    ind = (ind > -1) ? ind : 0
    this._lang = langs[ind]
  }

  requested (action) {
    return this._actions.includes(action)
  }

  process (raw) {
    let {
      text,
      parts: preserved
    } = this.prepare(raw)

    if (this.requested('specials')) {
      text = this.processSpecials(text)
    }
    if (this.requested('mathchars')) {
      text = this.processMath(text)
    }
    if (this.requested('mathchars') || this.requested('dashes')) {
      text = this.processMinuses(text, this._lang)
    }
    if (this.requested('punctuation')) {
      text = this.processPunctuation(text, this._actions)
    }
    if (this.requested('specialspaces')) {
      text = this.processSpecialSpaces(text)
    }
    if (this.requested('angles')) {
      text = this.processAngles(text)
    }
    if (this.requested('dblspace')) {
      text = this.processMultipleSpaces(text)
    }
    if (this.requested('quotes')) {
      text = this.processQuotes(text)
      text = this.processQuotesInner(text, this._lang)
    }
    if (this.requested('dashes')) {
      text = this.processDashes(text, this._actions)
    }
    if (this.requested('phones')) {
      text = this.processPhones(text, this._lang)
    }
    if (this.requested('numbers')) {
      text = this.processNumbers(text, this._lang)
    }
    if (this.requested('nbsp')) {
      text = this.processNbsps(text)
    }
    if (this.requested('hellip')) {
      text = this.processHellips(text)
    }
    if (this.requested('units')) {
      text = this.processUnits(text)
    }
    return this.ready(text, preserved)
  }

  prepare (text) {
    var el = document.createElement('div')
    el.innerHTML = text
    var typoEls = el.querySelectorAll('[data-typo]')
    var t = typoEls.length
    while (t--) {
      var typoHTML = typoEls[t].innerHTML
      typoEls[t].outerHTML = typoHTML
    }
    text = el.innerHTML
    var that = this
    /** Пометка на экранирование тэгов, кодов, цитат и т.п. **/
    text = text.replace(/(\r\n|\r)/g, '\n')
      .replace(/(\[code\]|\[quote[^\]$\n]*\]|<pre[^<>]*?>|\[img\])/g, '<' + this.tag + '>' + '$1')
      .replace(/(\[\/code\]|\[\/quote\]|<\/pre>|\[\/img\])/g, '$1' + '</' + this.tag + '>')
      .replace(/(<script[^<>]*?>|<style[^<>]*?>)/g, '<' + this.tag + '>' + '$1')
      .replace(/(<\/script>|<\/style>)/g, '$1' + '</' + this.tag + '>')
      .replace(/(<!--(.|\n)*?-->)/g, '<' + this.tag + '>' + '$1' + '</' + this.tag + '>')
      .replace(/(\[url[^\[\]]+?\])/g, '<' + this.tag + '>' + '$1' + '</' + this.tag + '>')
      .replace(/(="[^"\n\r]*")/g, '<' + this.tag + '>' + '$1' + '</' + this.tag + '>')
    /** Удаление вложенных <untypo> **/
    for (var i = 0; i < 10; ++i) {
      text = text.replace(this.r('(<' + this.tag + '>)([\\s\\S]*?)(<\\/?' + this.tag + '>)', 'g'), function ($0, $1, $2, $3) {
        if ($3.charAt(1) !== '/') {
          return $1 + $2
        } else {
          return $0
        }
      })
      text = text.replace(this.r('(<\\/' + this.tag + '>)([\\s\\S]*?)(<\\/?' + this.tag + '>)', 'g'), function ($0, $1, $2, $3) {
        if ($3.charAt(1) === '/') {
          return $2 + $3
        } else {
          return $0
        }
      })
    }
    /** Функция для экранирования **/
    function shield (z) {
      that.s = text.match(that.r('<' + that.tag + '>[\\s\\S]+?</' + that.tag + '>', 'g'))
      var i = 0
      if (that.s) {
        for (; i < that.s.length; i++) {
          var re = that.s[i].replace(that.r('<\\/?' + that.tag + '>', 'g'), '')
          that.m.push(re)
          text = text.replace('<' + that.tag + '>' + re + '</' + that.tag + '>', 'UNTYPO' + (i + z) + 'S')
        }
      }
      return i + z
    }
    /** Экранирование **/
    var z = shield(0)
    /** Обработка ссылок **/
    for (var n = 0; n < 2; ++n) {
      text = text.replace(this.RegLink, '$1<' + this.tag + '>' + '$2' + '</' + this.tag + '>$9')
        .replace(this.RegMail, '$1<' + this.tag + '>' + '$2' + '</' + this.tag + '>$7')
    }
    /** Экранирование ссылок **/
    z = shield(z)
    /** Замена utf символов на мнемоники **/
    for (var m = 0; m < this.htmlsym.length; ++m) {
      text = text.replace(this.r('&' + this.htmlsym[m] + ';', 'g'), this.normsym[m])
    }

    let preservations = []
    return this.preserveParts(text, preservations)
  }

  ready (text, preserved) {
    text = text.replace(/ (\))/g, '$1')
    /** Разэкранирование **/
    for (var k = this.m.length - 1; k >= 0; --k) {
      text = text.replace('UNTYPO' + k + 'S', this.m[k])
    }
    text = text.replace(this.r('(<\\/?' + this.tag + '>)+', 'g'), '$1')
    return this.restoreParts(text, preserved)
  }
}

window.Typoquotes = Typoquotes

export default Typoquotes
