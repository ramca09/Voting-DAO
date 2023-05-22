/* eslint-disable no-undef */
/* eslint-disable prefer-const */
function loadScriptSync(src) {
  let s = document.createElement('script')
  s.src = src
  s.type = 'text/javascript'
  s.async = false // <-- this is important
  document.getElementsByTagName('head')[0].appendChild(s)
}
loadScriptSync('/assets/js/jquery.min.js')
loadScriptSync('/assets/js/aos.js')
loadScriptSync('/assets/js/app.js')
