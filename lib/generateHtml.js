module.exports = function(cssPath, list) {
  var html = '<!doctype html>\n';
  html += '<html lang="cn">\n';
  html += '<head>\n';
  html += '  <meta charset="UTF-8" />\n';
  html += '  <title>Document</title>\n';
  html += '  <style>ul,li{margin:0;padding:0;list-style:none}i{font-style:normal;} .wrap{width:980px;margin: 100px auto 0;} li>i {float: left;font-size: 30px;}ul li{width:228px;line-height:32px;padding:10px 0 8px 16px;float: left;border:1px solid #eee;margin:-1px 0 0 -1px;}li code{color: rgb(209, 72, 54);padding: .2em .6em .1em .5em;white-space: nowrap;  font-family: Monaco, Menlo, Consolas, "Courier New", monospace;margin: .5em 0 .5em 1.5em;font-size: .8rem;border: .1rem solid rgb(233, 230, 232);background-color: rgb(249, 252, 247);border-radius:.2rem;}</style>\n';
  html += '  <link rel="stylesheet" href="' + cssPath + '">\n';
  html += '</head>\n';
  html += '<body>\n';
  html += '  <div class="wrap">\n';
  html += '    <ul>\n';
  list.forEach(function(glyph){
    html += '      <li>\n';
    html += '        <i class="icon icon-' + glyph.name + '"></i>\n';
    html += '        <code>.icon-' + glyph.name + '</code>\n';
    html += '      </li>\n';
  });
  html += '    </ul>\n';
  html += '  </div>\n';
  html += '</body>\n';
  html += '</html>\n';
  return html;
}
