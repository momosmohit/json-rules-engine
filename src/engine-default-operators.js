'use strict'

import Operator from './operator'
import fuzz from 'fuzzball'

const Operators = []
Operators.push(new Operator('equal', (a, b) => a === b))
Operators.push(new Operator('notEqual', (a, b) => a !== b))
Operators.push(new Operator('in', (a, b) => b.indexOf(a) > -1))
Operators.push(new Operator('notIn', (a, b) => b.indexOf(a) === -1))

Operators.push(new Operator('contains', (a, b) => a.indexOf(b) > -1, Array.isArray))
Operators.push(new Operator('doesNotContain', (a, b) => a.indexOf(b) === -1, Array.isArray))

function numberValidator (factValue) {
  return Number.parseFloat(factValue).toString() !== 'NaN'
}
Operators.push(new Operator('lessThan', (a, b) => a < b, numberValidator))
Operators.push(new Operator('lessThanInclusive', (a, b) => a <= b, numberValidator))
Operators.push(new Operator('greaterThan', (a, b) => a > b, numberValidator))
Operators.push(new Operator('greaterThanInclusive', (a, b) => a >= b, numberValidator))
Operators.push(new Operator('similarTo', (arr, b, score) => {
  console.log("a: ",arr)
  console.log("b: ",b)

  let mostSimiliarElement = null
  if (!arr) {
    return mostSimiliarElement
  }
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (fuzz(element, b) > (!score ? 65 : score)) {
      mostSimiliarElement = element
    }
  }
  return mostSimiliarElement
}, numberValidator))

export default Operators
