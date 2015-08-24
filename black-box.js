// method overloading
var replaceMethods = function (conf) {
  var originalMethods = Meteor.methods;

  Meteor.methods = function (dict) {
    var newDict = {};

    _.each(dict, function (func, name) {
      var wrappedFunction = _.wrap(func, function(innerFunc /*, arguments */) {
        // slice away the first parameter
        var args = Array.prototype.slice.call(arguments, 1);

        conf.log.function.call(conf.log.context, "Calling '" + name + "', arguments:", args);

        var result = innerFunc.apply(this, args);
        if (typeof result !== 'undefined') {
          conf.log.function.call(conf.log.context, "Result from '" + name + "':", result);
        }

        conf.log.function.call(conf.log.context, "Ending '" + name + "' call");
        return result;
      });

      newDict[name] = wrappedFunction;
    });

    originalMethods(newDict);
  };
};

if (Meteor.isClient) {
  _.defaults(BlackBox.client, BlackBox.global);
  replaceMethods(BlackBox.client);
}

if (Meteor.isServer) {
  _.defaults(BlackBox.server, BlackBox.global);
  replaceMethods(BlackBox.server);
}
