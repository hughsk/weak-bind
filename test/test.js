var weak = require('../')
  , assert = require('assert')

suite('Weak Bind', function() {
  suite('.bind()', function() {
    test('Assigns the same context', function() {
      var obj = { x: 2 };
      var fn = function() { return this.x };

      assert.equal(fn.bind(obj)(), weak(fn, obj)())
    })
    test('Still appends arguments', function() {
      var obj = { x: 2 };
      var fn = function(y, z) { return (this.x + y) * z };

      assert.equal(fn.bind(obj)(3, 2), 10)
      assert.equal(fn.bind(obj, 3)(2), 10)
      assert.equal(fn.bind(obj, 3, 2)(), 10)

      assert.equal(weak(fn, obj, 3)(2), 10)
      assert.equal(weak(fn, obj)(3, 2), 10)
      assert.equal(weak(fn, obj, 3, 2)(), 10)
    })
  })
  suite('.apply()', function() {
    test('Allows you to override the context', function() {
      var obj = { x: 2 };
      var fn = function(y) { return this.x + y; };
      fn.x = 3

      // Should call as obj
      assert.equal(fn.bind(obj).apply(fn, [1]), 3)
      // Should call as fn
      assert.equal(weak(fn, obj).apply(fn, [1]), 4)
    })
  })
  suite('.call()', function() {
    test('Allows you to override the context', function() {
      var obj = { x: 2 };
      var fn = function(y) { return this.x + y; };
      fn.x = 3

      // Should call as obj
      assert.equal(fn.bind(obj).call(fn, 1), 3)
      // Should call as fn
      assert.equal(weak(fn, obj).call(fn, 1), 4)
    })
  })
  suite('.unbind()', function() {
    test('Can be unbound completely', function() {
      var obj = { x: 10 }
      var fn = function(y) { return this.x * y; }
      fn.x = 100

      // Should be NaN, because global doesn't have an "x" property
      assert.equal(weak(fn, obj).unbind()(5) + '', NaN + '')
      assert.equal(weak(fn, obj).unbind().bind(fn)(5), (500))
      assert.equal(weak(fn, obj).unbind().bind(obj)(5), (50))
    })
  })
})