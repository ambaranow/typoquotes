import './../test/test.scss'

function getEl (path, root) {
  return root.querySelector(path)
}
function getEls (path, root) {
  return root.querySelectorAll(path)
}

function runTests () {
  var tests = getEls('.test', document)
  var i = tests.length
  while (i--) {
    var data = tests[i].dataset
    var typo = new Typoquotes(
      {
        lang: (data && data.lang) ? data.lang : 'ru'
      }
    )
    var source = getEl('.source', tests[i])
    var sourceHTML = source.innerHTML
    var model = getEl('.model', tests[i])
    var modelHTML = model.innerHTML
    var result = getEl('.result', tests[i])
    var targetHTML = typo.process(sourceHTML)
    // and more typo processes after first normalize
    targetHTML = typo.process(targetHTML)
    targetHTML = typo.process(targetHTML)
    var htmlDiff = window.global.prettydiff.prettydiff({
      crlf: false,
      html: false,
      lang: 'markup',
      langdefault: 'markup',
      newline: false,
      source: targetHTML,
      diff: modelHTML,
      diffview: 'inline'
    })
    result.innerHTML = htmlDiff
  }
}

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}
ready(runTests)
