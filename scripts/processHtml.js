var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var glob = require('glob-all');
var parse5 = require('parse5');
var htmlMinify = require('html-minifier').minify;

var htmlSrcBase = path.join(__dirname, '../src'),
  htmlDistBase = path.join(__dirname, '../dist');
var globPattern = path.join(htmlSrcBase, '**/*.html');
var allHtmlFiles = glob.sync(globPattern);
var assetsMap = require('./utils').assetsMap;

var needReplaceNodeNameList = ['script', 'link', 'img'];

allHtmlFiles.forEach(function (htmlFile) {
  var content = fs.readFileSync(htmlFile, 'utf8');
  var prodContent = processHtml(content);
  var minProdContent = htmlMinify(prodContent, {
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
  var relativePath = path.relative(htmlSrcBase, htmlFile);
  fs.writeFileSync(path.join(htmlDistBase, relativePath), minProdContent);
});

function processHtml(htmlStr) {
  var rootDom = parse5.parse(htmlStr);
  walk(rootDom, replaceSrc);
  return parse5.serialize(rootDom);
}

function walk(dom, processFn) {
  if (typeof processFn != 'function') {
    return console.warn('processFn should be provided')
  }
  processFn(dom);

  if (dom.childNodes) {
    dom.childNodes.forEach(function (child) {
      walk(child, processFn);
    })
  }
}

function replaceSrc(dom) {
  if (dom && dom.attrs && _.includes(needReplaceNodeNameList, dom.nodeName)) {
    dom.attrs.forEach(function (attr) {
      if (attr.name == 'src' || attr.name == 'href') {
        var key = attr.value;
        if (key in assetsMap) {
          //TODO add cdn
          attr.value = attr.value.replace(key, assetsMap[key]);
        }
      }
    })
  }
}
