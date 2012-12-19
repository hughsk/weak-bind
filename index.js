module.exports = function weakBind(oldfn, context) {
  var newfn = Function.prototype.bind.apply(oldfn, [].slice.call(arguments, 1))

  newfn.bind = function() {
    return Function.prototype.bind.apply(oldfn, [].slice.call(arguments))
  };

  newfn.apply = function() {
    return Function.prototype.apply.apply(oldfn, [].slice.call(arguments))
  };

  newfn.call = function() {
    return Function.prototype.call.apply(oldfn, [].slice.call(arguments))
  };

  function unbind() {
    return oldfn
  };
  newfn.unbind = newfn.unfbind || unbind

  return newfn
};
