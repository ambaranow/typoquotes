/*! typoquotes v0.1.1 *//******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = performReplace;
function performReplace(text, table) {
  table.forEach(function (o, i) {
    text = text.replace(i, o);
  });
  return text;
}
module.exports = exports["default"];

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preserveParts;
function preserveParts(text, exceptions) {
  var parts = new Map();
  exceptions.map(function (pattern) {
    text = text.replace(pattern, function (match) {
      var code = String(Math.random()).substr(2);
      parts.set(code, match);
      return "{" + code + "}";
    });
  });
  return {
    text: text,
    parts: parts
  };
}
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restoreParts;
function restoreParts(text, parts) {
  parts.forEach(function (o, i) {
    text = text.replace("{" + i + "}", o);
  });
  return text;
}
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Typoquotes = __webpack_require__(5);

exports.default = Typoquotes;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var actions = ['quotes', 'dashes', 'angles', 'dblspace', 'specials', 'mathchars', 'punctuation', 'specialspaces', 'phones', 'numbers', 'nbsp', 'hellip', 'units'];

var Typoquotes = function () {
  function Typoquotes() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Typoquotes);

    params.actionlist = params.actionlist || actions;
    params.lang = params.lang || 'ru';

    this.preserveParts = __webpack_require__(2);
    this.restoreParts = __webpack_require__(3);
    this.processSpecials = __webpack_require__(6);
    this.processMath = __webpack_require__(7);
    this.processMinuses = __webpack_require__(8);
    this.processPunctuation = __webpack_require__(9);
    this.processSpecialSpaces = __webpack_require__(10);
    this.processAngles = __webpack_require__(11);
    this.processMultipleSpaces = __webpack_require__(12);
    this.processQuotes = __webpack_require__(13);
    this.processQuotesInner = __webpack_require__(14);
    this.processDashes = __webpack_require__(15);
    this.processPhones = __webpack_require__(16);
    this.processNumbers = __webpack_require__(17);
    this.processNbsps = __webpack_require__(18);
    this.processHellips = __webpack_require__(19);
    this.processUnits = __webpack_require__(20);

    this.actions(params.actionlist);
    this.lang(params.lang);
    this.m = [];
    this.tag = 'untypo';
    this.s = '';
    /** Используемые символы **/
    this.normsym = ['—', '«', '»', '…', '©', '®', '™', '←', '→', '↑', '↓', '↔', '°', '́', '×', '≠', '±', '↕', '‘', '’', '−', '–', '“', '”', '„', '≥', '≤', '§', '€', '£', '″', '√', '∫', '½', '¼', '¾', ' ', '‚', '¹', '²', '³', '⅓', '⅔', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞', '≈', '\'', '⁰', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁺', '⁻', '⁼', '⁽', '⁾', 'ⁿ', 'ⁱ', '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₊', '₋', '₌', '₍', '₎'];
    this.htmlsym = ['mdash', 'laquo', 'raquo', 'hellip', 'copy', 'reg', 'trade', 'larr', 'rarr', 'uarr', 'darr', 'harr', 'deg', '#769', 'times', 'ne', 'plusmn', '#8597', 'lsquo', 'rsquo', 'minus', 'ndash', 'ldquo', 'rdquo', 'bdquo', 'ge', 'le', 'sect', 'euro', 'pound', 'Prime', 'radic', 'int', 'frac12', 'frac14', 'frac34', 'nbsp', 'sbquo', 'sup1', 'sup2', 'sup3', '#8531', '#8532', '#8533', '#8534', '#8535', '#8536', '#8537', '#8538', '#8539', '#8540', '#8541', '#8542', '#8776', 'quot', '#8304', '#8308', '#8309', '#8310', '#8311', '#8312', '#8313', '#8314', '#8315', '#8316', '#8317', '#8318', '#8319', '#8305', '#8320', '#8321', '#8322', '#8323', '#8324', '#8325', '#8326', '#8327', '#8328', '#8329', '#8330', '#8331', '#8332', '#8333', '#8334'];
    /** Регулярки на имейлы и ссылки **/
    this.RegLink = this.r('([  \n\t\v]|^)(((ht|f)tps?://)?([\\-\\w]+:[\\-\\w]+@)?([0-9a-z][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(:\\d{1,5})?([?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?)([  \n\t\v]|$)', 'gi');
    this.RegMail = this.r("([  \n\t\v]|^)([\\-a-z0-9!#$%&'*+\\/=?^_`{|}~]+(\\.[\\-a-z0-9!#$%&'*+\\/=?^_`{|}~]+)*@([a-z0-9]([\\-a-z0-9]{0,61}[a-z0-9])?\.)*([a-z]{2,6}))([  \n\t\v]|$)", 'gi');
  }

  _createClass(Typoquotes, [{
    key: 'r',
    value: function r(a, b) {
      return new RegExp(a, b);
    }
  }, {
    key: 'actions',
    value: function actions(actionlist) {
      this._actions = actionlist;
    }
  }, {
    key: 'lang',
    value: function lang(_lang) {
      var langs = ['ru', 'en'];
      var ind = langs.indexOf(_lang.toLowerCase());
      ind = ind > -1 ? ind : 0;
      this._lang = langs[ind];
    }
  }, {
    key: 'requested',
    value: function requested(action) {
      return this._actions.includes(action);
    }
  }, {
    key: 'process',
    value: function process(raw) {
      var _prepare = this.prepare(raw),
          text = _prepare.text,
          preserved = _prepare.parts;

      if (this.requested('specials')) {
        text = this.processSpecials(text);
      }
      if (this.requested('mathchars')) {
        text = this.processMath(text);
      }
      if (this.requested('mathchars') || this.requested('dashes')) {
        text = this.processMinuses(text, this._lang);
      }
      if (this.requested('punctuation')) {
        text = this.processPunctuation(text, this._actions);
      }
      if (this.requested('specialspaces')) {
        text = this.processSpecialSpaces(text);
      }
      if (this.requested('angles')) {
        text = this.processAngles(text);
      }
      if (this.requested('dblspace')) {
        text = this.processMultipleSpaces(text);
      }
      if (this.requested('quotes')) {
        text = this.processQuotes(text);
        text = this.processQuotesInner(text, this._lang);
      }
      if (this.requested('dashes')) {
        text = this.processDashes(text, this._actions);
      }
      if (this.requested('phones')) {
        text = this.processPhones(text, this._lang);
      }
      if (this.requested('numbers')) {
        text = this.processNumbers(text, this._lang);
      }
      if (this.requested('nbsp')) {
        text = this.processNbsps(text);
      }
      if (this.requested('hellip')) {
        text = this.processHellips(text);
      }
      if (this.requested('units')) {
        text = this.processUnits(text);
      }
      return this.ready(text, preserved);
    }
  }, {
    key: 'prepare',
    value: function prepare(text) {
      var el = document.createElement('div');
      el.innerHTML = text;
      var typoEls = el.querySelectorAll('[data-typo]');
      var t = typoEls.length;
      while (t--) {
        var typoHTML = typoEls[t].innerHTML;
        typoEls[t].outerHTML = typoHTML;
      }
      text = el.innerHTML;
      var that = this;
      /** Пометка на экранирование тэгов, кодов, цитат и т.п. **/
      text = text.replace(/(\r\n|\r)/g, '\n').replace(/(\[code\]|\[quote[^\]$\n]*\]|<pre[^<>]*?>|\[img\])/g, '<' + this.tag + '>' + '$1').replace(/(\[\/code\]|\[\/quote\]|<\/pre>|\[\/img\])/g, '$1' + '</' + this.tag + '>').replace(/(<script[^<>]*?>|<style[^<>]*?>)/g, '<' + this.tag + '>' + '$1').replace(/(<\/script>|<\/style>)/g, '$1' + '</' + this.tag + '>').replace(/(<!--(.|\n)*?-->)/g, '<' + this.tag + '>' + '$1' + '</' + this.tag + '>').replace(/(\[url[^\[\]]+?\])/g, '<' + this.tag + '>' + '$1' + '</' + this.tag + '>').replace(/(="[^"\n\r]*")/g, '<' + this.tag + '>' + '$1' + '</' + this.tag + '>');
      /** Удаление вложенных <untypo> **/
      for (var i = 0; i < 10; ++i) {
        text = text.replace(this.r('(<' + this.tag + '>)([\\s\\S]*?)(<\\/?' + this.tag + '>)', 'g'), function ($0, $1, $2, $3) {
          if ($3.charAt(1) !== '/') {
            return $1 + $2;
          } else {
            return $0;
          }
        });
        text = text.replace(this.r('(<\\/' + this.tag + '>)([\\s\\S]*?)(<\\/?' + this.tag + '>)', 'g'), function ($0, $1, $2, $3) {
          if ($3.charAt(1) === '/') {
            return $2 + $3;
          } else {
            return $0;
          }
        });
      }
      /** Функция для экранирования **/
      function shield(z) {
        that.s = text.match(that.r('<' + that.tag + '>[\\s\\S]+?</' + that.tag + '>', 'g'));
        var i = 0;
        if (that.s) {
          for (; i < that.s.length; i++) {
            var re = that.s[i].replace(that.r('<\\/?' + that.tag + '>', 'g'), '');
            that.m.push(re);
            text = text.replace('<' + that.tag + '>' + re + '</' + that.tag + '>', 'UNTYPO' + (i + z) + 'S');
          }
        }
        return i + z;
      }
      /** Экранирование **/
      var z = shield(0);
      /** Обработка ссылок **/
      for (var n = 0; n < 2; ++n) {
        text = text.replace(this.RegLink, '$1<' + this.tag + '>' + '$2' + '</' + this.tag + '>$9').replace(this.RegMail, '$1<' + this.tag + '>' + '$2' + '</' + this.tag + '>$7');
      }
      /** Экранирование ссылок **/
      z = shield(z);
      /** Замена utf символов на мнемоники **/
      for (var m = 0; m < this.htmlsym.length; ++m) {
        text = text.replace(this.r('&' + this.htmlsym[m] + ';', 'g'), this.normsym[m]);
      }

      var preservations = [];
      return this.preserveParts(text, preservations);
    }
  }, {
    key: 'ready',
    value: function ready(text, preserved) {
      text = text.replace(/ (\))/g, '$1');
      /** Разэкранирование **/
      for (var k = this.m.length - 1; k >= 0; --k) {
        text = text.replace('UNTYPO' + k + 'S', this.m[k]);
      }
      text = text.replace(this.r('(<\\/?' + this.tag + '>)+', 'g'), '$1');
      return this.restoreParts(text, preserved);
    }
  }]);

  return Typoquotes;
}();

window.Typoquotes = Typoquotes;

exports.default = Typoquotes;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processSpecials;
var performReplace = __webpack_require__(0);

function processSpecials(text) {
  var table = new Map([
  // ©
  [/(\([cс]\))|(\{copy\})/gi, '\xA9'],
  // ®
  [/(\(r\))|(\{reg\})/gi, '\xAE'], [/(\((тм|tm)\))|(\{(tm|trade)\})/gi, '\u2122'],
  // §
  [/\{(ss|sect)}/g, '\xA7'],
  // Degree °
  [/\{deg}/g, '\xB0'],
  // ₽
  [/\{rub}|\(rub\)/g, '\u20BD'], [/\{euro}|\(euro\)/g, '\u20AC'], [/\{cent}|\(cent\)/g, '\xA2'], [/\{pound}|\(pound\)/g, '\xA3'], [/\{(yen|yuan)}|\(yen|yuan\)/g, '\xA5'], [/\{alpha\}/gi, '\u03B1'], [/\{beta\}/gi, '\u03B2'], [/\{gamma\}/gi, '\u03B3'], [/\{delta\}/gi, '\u03B4'], [/\{epsilon\}/gi, '\u03B5'], [/\{theta\}/gi, '\u03B8'], [/\{lambda\}/gi, '\u03BB'], [/\{mu\}/gi, '\u03BC'], [/\{nu\}/gi, '\u03BD'], [/\{pi\}/gi, '\u03C0'], [/\{rho\}/gi, '\u03C1'], [/\{sigma\}/gi, '\u03C3'], [/\{tau\}/gi, '\u03C4'], [/\{phi\}/gi, '\u03C6'], [/\{psi\}/gi, '\u03A8'], [/\{omega\}/gi, '\u03C9']]);
  return performReplace(text, table);
}
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processMath;
var performReplace = __webpack_require__(0);

function processMath(text) {
  text = text.replace(/(\d)(\s)?(.)(\s)?(\d)/g, '$1$3$5');
  var table = new Map([[/\{!=}/g, '\u2260'], [/\{~}/g, '\u2248'], [/\{equal}/g, '\u2261'], [/\{<=}/g, '\u2A7D'], [/\{=>}/g, '\u2A7E'], [/\+-/g, '\xB1'], [/\{-}/g, '\u2013'], [/\{multiple}/g, '\xD7'], [/\{divide}/g, '\xF7'], [/<->/g, '\u2194'], [/<=>/g, '\u21D4'], [/<-/g, '\u2190'], [/<=/g, '\u21D0'], [/->/g, '\u2192'], [/=>/g, '\u21D2'], [/\{\^1}/g, '\xB9'], [/\{\^2}/g, '\xB2'], [/\{\^3}/g, '\xB3'], [/\{1\/8}/g, '\u215B'], [/\{1\/6}/g, '\u2159'], [/\{1\/5}/g, '\u2155'], [/\{1\/4}/g, '\xBC'], [/\{1\/3}/g, '\u2153'], [/\{1\/2}/g, '\xBD'], [/\{2\/5}/g, '\u2156'], [/\{2\/3}/g, '\u2154'], [/\{3\/8}/g, '\u215C'], [/\{3\/5}/g, '\u2157'], [/\{3\/4}/g, '\xBE'], [/\{4\/5}/g, '\u2158'], [/\{5\/6}/g, '\u215A'], [/\{5\/8}/g, '\u215D'], [/\{7\/8}/g, '\u215E'], [/\{part}/g, '\u2202'], [/\{any}/g, '\u2200'], [/\{exist}/g, '\u2203'], [/\{sum}/g, '\u03A3'], [/\{empty}/g, '\u2205'], [/\{infinity}/g, '\u221E'], [/\{belong}/g, '\u2208'], [/\{!belong}/g, '\u2209'], [/\{union}/g, '\u222A'], [/\{intersection}/g, '\u2229'], [/\{v}/g, '\u221A'], [/\{v3}/g, '\u221B'], [/\{v4}/g, '\u221C'], [/\{ang}/g, '\u2220']]);
  return performReplace(text, table);
}
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processMinuses;
function processMinuses(text, lang) {
  var r = function r(a, b) {
    return new RegExp(a, b);
  };
  text = text.replace(/&nbsp;|\u00a0/gi, ' ');
  text = text.replace(/([^\s])(\u2014)([^\s])/gm, '$1 $2 $3');
  text = text.replace(/\u2012|\u2013|\u002d|\u02d7|\u2212/gm, '-');
  text = text.replace(/\s+(-)\s+/gm, ' $1 ');
  text = text.replace(/([\u00bb\u201c"],)(-)/gm, '$1 $2');
  if (lang === 'ru') {
    // lang === 'ru'
    text = text.replace(/(\s|^|<p>)([«"„‚]*)(-)([\s]|$)/g, '$1' + '$2—$4');
    text = text.replace(/([A-Za-zА-яёЁ0-9]) —/g, '$1 —');
    text = text.replace(/([.,!?] |\n|^|<p>)— ([A-Za-zА-яёЁ0-9«"„‚])/g, '$1— $2');
    // Расстановка дефисов
    var mst = '(где|зачем|как|какая|какие|каким|каких|какое|какой|какого|каком|какому|кем|когда|кого|ком|кому|кто|куда|откуда|почему|чего|чем|чему|что|чём)';
    text = text.replace(r('([^А-яёЁ]|^)' + mst + '[ ]{2}?(то|либо|нибудь)([^А-яёЁ]|$)', 'gi'), '$1' + '$2-$3' + '$4').replace(r('([^А-яёЁ]|^)' + mst + '[ ]{2}?(то|либо|нибудь)([^А-яёЁ]|$)', 'gi'), '$1' + '$2-$3' + '$4').replace(r('([^А-яёЁ]|^)(кое|кой)[ ]{2}?' + mst + '([^А-яёЁ]|$)', 'gi'), '$1' + '$2-$3' + '$4').replace(r('([^А-яёЁ]|^)(кое|кой)[ ]{2}?' + mst + '([^А-яёЁ]|$)', 'gi'), '$1' + '$2-$3' + '$4').replace(/([\s]|^)(из)[ ]{2}?(за)([\s]|$)/gi, '$1' + '$2-$3' + '$4').replace(/([\s]|^)(из)[ ]{2}?(под)([\s]|$)/gi, '$1' + '$2-$3' + '$4').replace(/([А-яёЁ]{2,}) (ка|кась)([\s,.?!]|$)/g, '$1-$2' + '$3').replace(/([^А-яёЁ]|^)(вс[ёе]|так)[ ]{2}?(таки)([^А-яёЁ]|$)/gi, '$1' + '$2-$3' + '$4').replace(/(ГОСТ(?:[ ]{2}Р))?[ ]{2}([\d.]+)-([\d]+)/gi, '$1 $2–$3');
    // Расстановка тире в датах
    text = text.replace(/([IVXLCDM]{1,3})-([IVXLCDM]{1,3})[ ]{2}?вв?\.?([\s.,?!;)])/g, '$1—$2 вв.$3').replace(/([\d]{1,4})-([\d]{1,4})[ ]{2}?гг?\.([\s.,?!;)])/g, '$1–$2 гг.$3').replace(/([^\d]|^)([0-2][0-9]:[0-5][0-9])-([0-2][0-9]:[0-5][0-9])([^\d]|$)/g, '$1' + '$2–$3' + '$4');
    var mo = '(?:[ьяюе]|[её]м)';
    var to = '(?:[ауе]|ом)';
    var month = '(январ' + mo + '|феврал' + mo + '|март' + to + '|апрел' + mo + '|ма(?:[йяюе]|ем)|ию[нл]' + mo + 'август' + to + '|сентябр' + mo + '|ноябр' + mo + '|октябр' + mo + '|декабр' + mo + ')';
    text = text.replace(r('([\\s]|^)([1-3]?[\\d])-([1-3]?[\\d])[ ]{2}?' + month + '([^А-яёЁ]|$)', 'gi'), '$1' + '$2–$3 $4' + '$5').replace(r('([^А-яёЁ]|^)' + month + '-' + month + '([^А-яёЁ]|&)', 'gi'), '$1' + '$2—$3' + '$4');
  }
  text = text.replace(/(\d)--(\d)/g, '$1–$2').replace(/([^-]|\s|^)--([^-]|$|\n)/g, '$1—$2').replace(/([^-\d]|^)(\d+)-(\d+)([^-\d]|$)/g, '$1' + '$2\u2013$3' + '$4').replace(/([^a-z][a-z]|[Α-Ωα-ω+=*/])-(\d)/g, '$1−$2');
  text = text.replace(/\s+(-)\s+/gm, '$1');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processPunctuation;
var performReplace = __webpack_require__(0);
var preserveParts = __webpack_require__(2);
var restoreParts = __webpack_require__(3);

function processPunctuation(text, availActions) {
  // Двойные пробелы
  text = text.replace(/( |\u00a0){2,}/g, ' ');
  // Двойные табы
  text = text.replace(/(\t){2,}/g, '\t');
  // Двойные точки
  text = text.replace(/([^.])(\.{2})([^.])/g, '$1.$3'); // try double dots
  text = text.replace(/(\.){4,}/g, '.');
  // Двойные и более запятые, двоеточия и точки с запятой
  text = text.replace(/(,|:|;){2,}/g, '$1');
  // Двойные и больше энтеры
  text = text.replace(/(\s*)\n{2,}(\s*)/g, '\n'); // Абзацы
  text = text.replace(/(\u2028|\u2029){2,}/g, '\u2028'); // Перенос строки

  var table = new Map();
  table.set(/([.,!?:)])(?=[^ \n"'.,;!?&:\])<»”{)])/g, '$1 ');
  table.set(/[\s]*(?=[.,;!?:])/g, '');
  table.set(/\s([-\u2013\u2014])/g, ' $1');
  if (availActions.includes('nbsp')) {
    table.set(/\s([-\u2013\u2014])/g, '&nbsp;$1');
  }

  var _preserveParts = preserveParts(text, [/[\d]+([.,][\d]+)+/g, /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/gi, /((([a-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[a-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[a-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/gi, /[:;.]['_-]{0,2}[.,edpobnsu*#@|()&$308ехорвъэ]/gi]),
      preservedText = _preserveParts.text,
      parts = _preserveParts.parts;

  preservedText = performReplace(preservedText, table);
  return restoreParts(preservedText, parts);
}
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processSpecialSpaces;
var performReplace = __webpack_require__(0);

function processSpecialSpaces(text) {
  var table = new Map([[/([\u2116\u00a7])[\s]*(?=[\d])/g, '$1&nbsp;'], // non-breaking space №_123
  [/([\d])[\s]*(?=\u00b0[CСF])/g, '$1 '], [/([\d])[\s]*(?=%)/g, '$1']]);
  return performReplace(text, table);
}
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processAngles;
var performReplace = __webpack_require__(0);

function processAngles(text) {
  var table = new Map([[/(\d)\*([\D])/g, '$1\xB0$2'], // Degree °
  [/(\d)'/g, '$1\u2032'], // Prime ′
  [/(^[^"]*\d)"([^"]*$)/g, '$1\u2033$2'], // Double Prime ″
  [/("[^"]*\d)"([^"]*?")/g, '$1\u2033$2']]);
  return performReplace(text, table);
}
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processMultipleSpaces;
function processMultipleSpaces(text) {
  return text.replace(/[\s]{2,}/g, ' ');
}
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processQuotes;
/*
* \u00ab => «
* \u00bb => »
*
*/
function processQuotes(text) {
  text = text.replace(/(^|\n|\s|—|-|\()"/g, '$1«').replace(/"($|\n|\s|—|-|\.|,|!|\?|:|;|\))/g, '»$1').replace(/«\)/g, '»)').replace(/«( ?)/g, '«').replace(/( ?)»/g, '»').replace(/>"/g, '>«').replace(/"</g, '»<').replace(/«""/g, '«««').replace(/«"/g, '««').replace(/""»/g, '»»»').replace(/"»/g, '»»').replace(/("{2}|"»)/g, '»»').replace(/$"/g, '«').replace(/([A-Za-zа-яА-ЯёЁ])'/g, '$1’');

  text = text.replace(/[a-zA-ZА-яёЁ]"-/g, '$1»-').replace(/-"[a-zA-ZА-яёЁ]/g, '-«$1');
  text = text.replace(/(^[^«»]*)"/g, '$1«').replace(/"([^«»]*$)/g, '»$1').replace(/«([^«»]*)"/g, '«$1»').replace(/"([^«»]*)»/g, '«$1»');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processQuotesInner;
/*
 * \u00ab => «
 * \u00bb => »
 * \u201c => “
 * \u201e => „
 *
 */

function processQuotesInner(text, lang) {
  function rl(i, j) {
    // r_leveled
    var b = '';
    var c = '';
    var d = '';
    if (i !== 0) {
      b = text.substring(0, i);
    }
    if (j !== text.length - 1) {
      d = text.substring(j + 1, text.length);
    }
    c = text.substring(i, j + 1);
    for (var k = 0; k < 32; ++k) {
      c = c.replace(/«([^«»]*)«([^»]*)»/g, '«$1„$2“');
      c = c.replace(/„([^„“]*)„([^“]*)“/g, '„$1‚$2‘');
    }
    return b + c + d;
  };
  var level = 0;
  for (var i = 0; i < text.length; ++i) {
    if (text.charAt(i) === '«') {
      ++level;
      for (var j = i + 1; j < text.length; ++j) {
        if (text.charAt(j) === '«') {
          ++level;
        }
        if (text.charAt(j) === '»') {
          --level;
          if (level <= 0) {
            text = rl(i, j); // r_leveled
            i = j;
            break;
          }
        }
      }
      level = 0;
    }
  }
  if (lang === 'en') {
    text = text.replace(/(»|’)(\.|,|!|\?)/g, '$2' + '$1').replace(/«/g, '“').replace(/»/g, '”');
  }
  // Восстанавливает англйиские сокращения, like don't, year's
  text = text.replace(/([A-z])”([A-z])/g, '$1’$2');
  text = text.replace(/«(\d+( |\xA0)[A-z])/g, '“$1');
  text = text.replace(/([A-z]( |\xA0)\d+)»/g, '$1”');
  // .»  →  ».
  text = text.replace(/([^.{2}])(\.{1}»)/g, '$1».');
  text = text.replace(/([^.{2}])(\.{1}”)/g, '$1”.');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processDashes;
function processDashes(text, availActions) {
  return text;
}
module.exports = exports["default"];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processPhones;
function processPhones(text, lang) {
  text = text.replace(/((тел\.|телефон?[а-я]{1,3})(:?)(\s+?))?(\+7|8)(\s+)?(\(?)(\d{3})(\)?)(\s+)?(\d{3})(\u2012|\u2013|\u2014|\u002d|\u02d7|\u2212)?(\d{2})(\u2012|\u2013|\u2014|\u002d|\u02d7|\u2212)?(\d{2})([^\w])/gi, '$2$3 <span data-typo="" class="nowrap">+7($8) $11\u2013$13\u2013$15</span>$16');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processNumbers;
function processNumbers(text, lang) {
  // Цифры на разряды 10 000
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6&nbsp;$7&nbsp;$8&nbsp;$9');
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6&nbsp;$7&nbsp;$8');
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6&nbsp;$7');
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5&nbsp;$6');
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{1,3}) ?(\d{3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4&nbsp;$5');
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{1,3}) ?(\d{3}) ?(\d{3})/g, '$1$2&nbsp;$3&nbsp;$4');
  text = text.replace(/( |\xA0|^|\n|\u2028|\u2029)(\d{2,3}) ?(\d{3})/g, '$1$2&nbsp;$3');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processNbsps;
function processNbsps(text) {
  text = text.replace(/(\s)\/(\s)/g, '&nbsp;/&nbsp;');
  text = text.replace(/((^|[\s])[a-zа-яёіїєґ'′]{1,2})[\s]/gi, '$1&nbsp;');
  text = text.replace(/(\d)([a-zа-я])/g, '$1&nbsp;$2');
  text = text.replace(/(\d)(\s)(\W)/g, '$1&nbsp;$3');
  text = text.replace(/(тыс|млн|млрд|трлн|кв\.)(\s)(р\.|руб|кило|тон|кв(\.)?|м(\.)?)/gi, '$1&nbsp;$3');
  var preps = ['без', 'безо', 'в', 'во', 'вне', 'для', 'до', 'за', 'из', 'изо', 'из-за', 'из-под', 'к', 'ко', 'на', 'над', 'о', 'об', 'обо', 'около', 'от', 'ото', 'по', 'по-над', 'под', 'подо', 'при', 'про', 'с', 'со', 'сквозь', 'у', 'через', 'а', 'но', 'и', 'да', 'или', 'иль', 'либо', 'не', 'ни', 'a', 'the', 'at', 'to', 'or'];
  for (var i = 0; i < preps.length; i++) {
    var tmp = new RegExp('( |^|\\(|\xAB|\u201E|\xA0)(' + preps[i] + ') ', 'ig');
    text = text.replace(tmp, '$1$2&nbsp;');
  }
  // люди ФИО
  // И.И.Иванов
  text = text.replace(/([А-Я]\.)(\s)?([А-Я]\.)(\s)?([А-Я][А-Яа-я]*)/g, '$1&nbsp;$3&nbsp;$5');
  // Иванов И.И.
  text = text.replace(/([А-Я][А-Яа-я]*)(\s)?([А-Я]\.)(\s)?([А-Я]\.)/g, '$1&nbsp;$3&nbsp;$5');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processHellips;
function processHellips(text) {
  text = text.replace(/\.{3}/g, '\u2026');
  return text;
}
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processUnits;
function processUnits(text, lang) {
  // Квадраты и кубы
  text = text.replace(/(\s)?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?2/gi, '$2²');
  text = text.replace(/(\s)?(мкм|мм|см|дм|м|км|µm|mm|cm|m|km)\^?3/gi, '$2³');
  return text;
}
module.exports = exports['default'];

/***/ })
/******/ ]);