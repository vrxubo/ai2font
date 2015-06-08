var readDir = require('./lib/readDir');
var fs = require('fs');
var path = require('path');
var svg2ttf = require('svg2ttf');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');
var svgicons2svgfont = require('svgicons2svgfont');
var generateCss = require('./lib/generatecss');
var fontName = 'h5icon';
var prefixdict = {
    "h5"           : 'http://h5.lietou-static.com/m',
    "core-h5"      : 'http://core.h5.lietou-static.com',
    "a-h5"         : 'http://a.h5.lietou-static.com',
    "article-h5"   : 'http://article.h5.lietou-static.com',
    "ats-h5"       : 'http://ats.h5.lietou-static.com',
    "c-h5"         : 'http://c.h5.lietou-static.com',
    "campus-h5"    : 'http://campus.h5.lietou-static.com',
    "city-h5"      : 'http://city.h5.lietou-static.com',
    "clt-h5"       : 'http://clt.h5.lietou-static.com',
    "company-h5"   : 'http://company.h5.lietou-static.com',
    "erp-h5"       : 'http://erp.h5.lietou-static.com',
    "event-h5"     : 'http://event.h5.lietou-static.com',
    "h-h5"         : 'http://h.h5.lietou-static.com',
    "job-h5"       : 'http://job.h5.lietou-static.com',
    "lpt-h5"       : 'http://lpt.h5.lietou-static.com',
    "phone-h5"     : 'http://phone.h5.lietou-static.com',
    "sns-h5"       : 'http://sns.h5.lietou-static.com',
    "www-h5"       : 'http://www.h5.lietou-static.com',
    "it-h5"        : 'http://it.h5.lietou-static.com',
    "core-pc"      : 'http://core.pc.lietou-static.com',
    "a-pc"         : 'http://a.pc.lietou-static.com',
    "article-pc"   : 'http://article.pc.lietou-static.com',
    "ats-pc"       : 'http://ats.pc.lietou-static.com',
    "c-pc"         : 'http://c.pc.lietou-static.com',
    "campus-pc"    : 'http://campus.pc.lietou-static.com',
    "city-pc"      : 'http://city.pc.lietou-static.com',
    "clt-pc"       : 'http://clt.pc.lietou-static.com',
    "company-pc"   : 'http://company.pc.lietou-static.com',
    "erp-pc"       : 'http://erp.pc.lietou-static.com',
    "event-pc"     : 'http://event.pc.lietou-static.com',
    "h-pc"         : 'http://h.pc.lietou-static.com',
    "job-pc"       : 'http://job.pc.lietou-static.com',
    "lpt-pc"       : 'http://lpt.pc.lietou-static.com',
    "phone-pc"     : 'http://phone.pc.lietou-static.com',
    "sns-pc"       : 'http://sns.pc.lietou-static.com',
    "www-pc"       : 'http://www.pc.lietou-static.com',
    "it-pc"        : 'http://it.pc.lietou-static.com'
};
var absreg = /(.*(?:core|dev)([\/\\]))([a-z]+)?[\/\\]?(pc|h5)([\/\\](?:trunk|branches[\/\\][^\/\\]+))([\/\\][^\s]+)/i;
module.exports = function(dir, isDeep) {
  isDeep = !!isDeep;
  var cdp = dir || process.cwd();
  readDir({
    dirpath: cdp,
    callback: function(err, list) {
      if (!list.length) {
        return;
      }
      var targetDir = cdp.replace(absreg, '$1$3$2$4$5$2v1$2font$2');
      var fontFilePath = path.join(targetDir, fontName+'.svg');
      var ttfFilePath = path.join(targetDir, fontName+'.ttf');
      var cssFilePath = path.join(targetDir, fontName+'.css');
      var woffFilePath = path.join(targetDir, fontName+'.woff');
      var eotFilePath = path.join(targetDir, fontName+'.eot');
      var pf = cdp.replace(absreg, '$3-$4') || 'c-h5';
      var webPath = prefixdict[pf] + '/v1/font/';
      svgicons2svgfont(list, {
        fontName: fontName
      }).pipe(fs.createWriteStream(fontFilePath)).on('finish',function() {
        fs.readFile(fontFilePath, 'utf-8',function(err, data) {
          var ttfcontent = new Buffer(svg2ttf(data, {}).buffer);
          fs.writeFile(ttfFilePath, ttfcontent, function(err) {
            if (!err) {
              console.log('ttf created.');
            } else {
              console.log(err)
            }
          });
          var ttfcontent2 = new Uint8Array(ttfcontent);
          var woffcontent = new Buffer(ttf2woff(ttfcontent2).buffer);
          var eotcontent = new Buffer(ttf2eot(ttfcontent2).buffer);
          fs.writeFile(woffFilePath , woffcontent, function() {
            if (!err) {
              console.log('woff created.');
            }
          });
          fs.writeFile(eotFilePath , eotcontent, function() {
            if (!err) {
              console.log('eot created.');
            }
          });
        });
      });
      fs.writeFile(cssFilePath, generateCss(fontName, webPath, list), function(err) {
        console.log('css created.');
      });
    },
    isDeep: isDeep
  });
}

// AngularJs
// module.exports()
