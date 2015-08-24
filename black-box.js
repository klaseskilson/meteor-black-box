var originalMethods = Meteor.methods;

var _logger = {
  func: console.info,
  context: console
};

Meteor.methods = function (dict) {
  var newDict = {};

  _.each(dict, function (func, name) {
    var wrappedFunction = _.wrap(func, function(innerFunc /*, arguments */) {
      // slice away the first parameter
      var args = Array.prototype.slice.call(arguments, 1);

      _logger.func.call(_logger.context, "Calling '" + name + "', arguments:", args);

      var result = innerFunc.apply(this, args);
      if (typeof result !== 'undefined') {
        _logger.func.call(_logger.context, "Result from '" + name + "':", JSON.stringify(result));
      }

      _logger.func.call(_logger.context, "Ending '" + name + "' call");
      return result;
    });

    newDict[name] = wrappedFunction;
  });

  originalMethods(newDict);
};
