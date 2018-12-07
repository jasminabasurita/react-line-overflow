'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveModule;

var _ramda = require('ramda');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _module = require('module');

var _module2 = _interopRequireDefault(_module);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDirectories(srcPath) {
  // Slow synchronous version of https://github.com/megawac/lodash-modularize/blob/master/src/lodashModules.js.
  // Using the paths lodash-cli provides is not an option as they may change version to version =(
  return ['.'].concat(_fs2.default.readdirSync(srcPath)).filter(function (filePath) {
    return _fs2.default.statSync(_path2.default.join(srcPath, filePath)).isDirectory();
  });
}

var _ramdaPath = _path2.default.dirname(_module2.default._resolveFilename('ramda', (0, _ramda.merge)(new _module2.default(), {
  'paths': _module2.default._nodeModulePaths(process.cwd())
})));

// ramda folder will be /nodemodules/ramda/dist. We want to remove the dist
var ramdaPath = _ramdaPath.slice(0, _ramdaPath.lastIndexOf('ramda') + 5);

// We do not need to change the search path based on useES since src and es are both built from the
// same source in Ramda, and the directories will therefore always have identical contents.
var methods = _fs2.default.readdirSync(_path2.default.join(ramdaPath, 'src')).filter(function (name) {
  return _path2.default.extname(name) == '.js';
}).map(function (name) {
  return _path2.default.basename(name, '.js');
});

function resolveModule(useES, name) {

  for (var category in methods) {
    if ((0, _ramda.contains)(name, methods)) {
      return 'ramda/' + (useES ? 'es' : 'src') + '/' + name;
    }
  }
  throw new Error('Ramda method ' + name + ' was not a known function\n    Please file a bug if it\'s my fault https://github.com/megawac/babel-plugin-ramda/issues\n  ');
};