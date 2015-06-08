module.exports = function(fontName, fontPath, glyphs) {
  var cssText = '@font-face {';
  cssText += '  font-family: "' + fontName + '";';
  cssText += '  src: url(' + fontPath + fontName + '.eot);';
  cssText += '  src: url(' + fontPath + fontName + '.eot?#iefix) format("eot"),';
  cssText += '    url(' + fontPath + fontName + '.woff) format("woff"),';
  cssText += '    url(' + fontPath + fontName + '.ttf) format("truetype"),';
  cssText += '    url(' + fontPath + fontName + '.svg#' + fontName + ') format("svg");';
  cssText += '}';
  cssText += '';
  cssText += '.icon:before {';
  cssText += '  font-family: "' + fontName + '";';
  cssText += '  -webkit-font-smoothing: antialiased;';
  cssText += '  -moz-osx-font-smoothing: grayscale;';
  cssText += '  font-style: normal;';
  cssText += '  font-variant: normal;';
  cssText += '  font-weight: normal;';
  cssText += '  text-decoration: none;';
  cssText += '  text-transform: none;';
  cssText += '}';
  glyphs.forEach(function(glyph) {
    cssText += '.icon-' + glyph.name + ':before {' ;
    cssText += '  content: "\\' + glyph.codepoint.toString(16) + '";' ;
    cssText += '}';
  });
  return cssText;
}

