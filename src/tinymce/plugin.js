let Typoquotes = require('./../typoquotes')

/* global tinymce:true */

tinymce.PluginManager.add('typoquotesmce', function (editor) {
  function typoquotes () {
    var lang = editor && editor.settings && editor.settings.language
    switch (lang) {
      case 'en_US':
        lang = 'en'
        break
      default:
        lang = 'ru'
        break
    }
    var typo = new Typoquotes(
      {
        lang: lang
      }
    )
    var targetHTML = typo.process(editor.getContent())
    editor.setContent(targetHTML)
  }

  editor.addCommand('mceTypoquotes', function () {
    typoquotes()
  })

  editor.addButton('typoquotesmce', {
    icon: 'typoquotesmce',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACVBMVEUAAAD///8AAABzxoNxAAAAAnRSTlMAAHaTzTgAAAAiSURBVHgBY2BEA1QRYGBgAiEMGsZCE0AghAhBLZg0NZwOAG0sAMktMuCLAAAAAElFTkSuQmCC',
    title: 'Типограф',
    cmd: 'mceTypoquotes'
  })
})
