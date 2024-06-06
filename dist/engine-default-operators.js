'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _operator = require('./operator');

var _operator2 = _interopRequireDefault(_operator);

var _fuzzball = require('fuzzball');

var _fuzzball2 = _interopRequireDefault(_fuzzball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Operators = [];
Operators.push(new _operator2.default('equal', function (a, b) {
  return a === b;
}));
Operators.push(new _operator2.default('notEqual', function (a, b) {
  return a !== b;
}));
Operators.push(new _operator2.default('in', function (a, b) {
  return b.indexOf(a) > -1;
}));
Operators.push(new _operator2.default('notIn', function (a, b) {
  return b.indexOf(a) === -1;
}));

Operators.push(new _operator2.default('contains', function (a, b) {
  return a.indexOf(b) > -1;
}, Array.isArray));
Operators.push(new _operator2.default('doesNotContain', function (a, b) {
  return a.indexOf(b) === -1;
}, Array.isArray));

function numberValidator(factValue) {
  return Number.parseFloat(factValue).toString() !== 'NaN';
}
Operators.push(new _operator2.default('lessThan', function (a, b) {
  return a < b;
}, numberValidator));
Operators.push(new _operator2.default('lessThanInclusive', function (a, b) {
  return a <= b;
}, numberValidator));
Operators.push(new _operator2.default('greaterThan', function (a, b) {
  return a > b;
}, numberValidator));
Operators.push(new _operator2.default('greaterThanInclusive', function (a, b) {
  return a >= b;
}, numberValidator));
Operators.push(new _operator2.default('similarTo', function (arr, b, score) {
  console.log("a: ", arr);
  console.log("b: ", b);

  var mostSimiliarElement = null;
  if (!arr) {
    return mostSimiliarElement;
  }
  for (var index = 0; index < arr.length; index++) {
    var element = arr[index];
    if ((0, _fuzzball2.default)(element, b) > (!score ? 65 : score)) {
      mostSimiliarElement = element;
    }
  }
  return mostSimiliarElement;
}, numberValidator));

exports.default = Operators;