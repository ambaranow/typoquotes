# Typoquotes

JS-класс для преобразования текстов: расстановка кавычек, дефисы, тире, перенос строк, числа, номера, замена комбинаций текста на схожие UTF-символы.

Сборка - webpack. Приложения, использующие библиотеку могут вытягивать ее как bower- или npm-пакет

-----

# Run

* `npm start` - run for dev
* `npm run build` - run for production


Source

```
├src
├─test            //  тесты для dev-окружения, включение typoquotes.js в bundle
│ ├─*.html
│ ├─index.pug     // инклюдит test.pug
│ ├─test.pug      // собирает *.html
│ ├─test.js       // приложение для тестов
│ └─test.css
├─libtest         // пример подключения отдельного typoquotes.js
│ ├─*.html
│ ├─index.pug     // инклюдит ./../test/test.pug
│ └─libtest.js    // приложения для запуска тестов
├─typoquotes      // исходник typoquotes.js, можно использовать для включения в bundle
│ ├─perform
│ ├─preserve
│ ├─process       // набор js для преобразования текста
│ │ ├─*.js
│ ├─restore
│ ├─index.js      // для экспорта typoquotes.js
│ └─typoquotes.js // js-класс для приложения typoquotes.js
```

`/src/test` - тестовое окружение для dev, пример подключения исходника typoquotes.js для его включения в пакет js-приложения. 
Тест-кейсы писать в `/src/test/*.html` и подключать в `/src/test/test.pug`

`/src/libtest` - пример подключения собранного в vanilla-js typoquotes.js.

`/typoquotes/typoquotes.js` - js-класс приложения. 
`/typoquotes/process/*.js` - js-методы для преобразований.

Build 

```
├dist
├─test
│ ├─index.html
│ ├─test.min.js
│ └─test.min.css
├─libtest
│ ├─index.html
│ ├─libtest.min.js
│ └─libtest.min.css
├─typoquotes
│ └─typoquotes.min.js
├─typoquotesmce
│ ├─index.js
│ ├─plugin.js
│ └─plugin.min.js
```

# Приложение

`/dist/typoquotes/typoquotes.min.js` - js-класс для подключения в любое js-приложение

`/dist/typoquotes-mce/plugin.min.js` - плагин для tiny-mce

```
var typo = new Typoquotes(
  {
    lang: 'ru'          // может быть "ru" или "en",
    actionlist: [       // список действий
      'quotes',         // упорядочивание кавычек
      'dashes',         // упорядочивание тире
      'angles',         // градус, дюйм, апостроф
      'dblspace',       // сокращает множественные пробелы
      'specials',       // заменяет некоторые комбинации вида (c) {ss} {rub} на UTF-символы © § ₽
      'mathchars',      // заменяет некоторые комбинации вида {1/8} {^2} на UTF-символы вида ⅛ ²
      'punctuation',    // настраивает пунктуацию, устраняет двойные символы
      'specialspaces',  // связывает символы (напр. №) с числами
      'phones',         // форматирует телефонные номера
      'numbers',        // форматирует длинные числа (разбивает на разряды)
      'nbsp',           // связывает предлоги со словами, инициалы с фамилиями
      'hellip',         // три последовательные точки в символ многоточия
      'units'           // квадратные и кубические (мм, км, и т.п.) км2 => км²
    ]
  }
)
```

* `lang` - язык, не обязательный, по умолчанию "ru"
* `actionlist` - список действий, не обязательный, при отсутствии выполняются все действия

-----

# Подключение плагина в TinyMCE

Скопировать `/dist/typoquotes-mce/` в папку `tinymce/plugins` (вручную или таск-менеджером)

В настройках TinyMCE должен быть установлен параметр `language`, значения: `ru_RU` или `en_US`, поведение плагина зависит от языка, по умолчанию `ru_RU`.

Добавить в список плагинов:

```
"plugins": [
	'typoquotesmce'
],
```

Добавить кнопку в панель:

```
"toolbar": '... | typoquotesmce | ...'
],
```

# Подключение js-модуля из src

Вытянуть с помощью yarn или npm (package.json):

```
  "dependencies": {
    "typoquotes": "git+ssh://git@gitlab.notamedia.ru:mos-front/typoquotes-app.git",
    "babel-core": "^6.26.0",
    "babel-loader": "^6.3.2",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-preset-env": "^1.6.1",
  }
```

Для webpack:

```
{
  test: /typoquotes/,
  loader: 'babel-loader',
  options: {
    plugins: ['babel-plugin-add-module-exports'],
    presets: ['env']
  }
},
```

Подключить в свой js

```
var Typoquotes = require('typoquotes/src/typoquotes')

// инициализация класса
var typo = new Typoquotes(
  {
    lang: 'ru'
  }
);
// основной процесс
return typo.process(str);

```

-----

Much appreciated

* [asleepwalker/typographie.js](https://github.com/asleepwalker/typographie.js)
* [typographer.js](https://github.com/fromanywhere/Typograph-Live/blob/master/build/typographer.js)
* [jquery.typograph.js](https://github.com/Guillaume-allard/typograph/blob/master/jquery.typograph.js)
* [typograph.js](https://github.com/dezonik/Typograph/blob/master/typograph.sketchplugin/Contents/Sketch/typograph.js)