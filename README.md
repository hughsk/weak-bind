# weak-bind #

Once a function is bound, there's no way of un-binding it - i.e. to run it
under a different context. So, this module is an equivalent to
`Function.prototype.bind`, which still allows for the function context to be
overridden with `bind`, `call` and `apply`.

## Installation ##

``` bash
$ npm install weak-bind
```

## Usage ##

`bind(fn, context, [args...])` is equivalent to `fn.bind(context, [args...])`,
but reversible.

``` javascript
var bind = require('weak-bind')
  , first = { x: 'first' }
  , second = { x: 'second' }

function getX() {
  return this.x;
};

getX(); // NaN

bind(getX, first)() // "first"
getX.bind(first)()  // "first"

bind(getX, first).bind(second)() // "second"
getX.bind(first).bind(second)()  // "first"
```