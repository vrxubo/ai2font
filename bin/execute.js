#!/usr/bin/env node
var ai2font = require('../');
var args = process.argv;
var fs = require('fs');
var deep = !!args[3];
if (args[2]) {
  fs.stat(args[2], function(err, stat) {
    if (err) {
      console.dir(err);
    } else {
      if (stat.isDirectory()) {
        ai2font(args[2], deep);
      } else {
        console.log('参数1不是一个有效的目录');
      }
    }
  });
} else {
  ai2font();
}
