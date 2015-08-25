// method overloading
var replaceMethods = function (conf) {
  var originalMethods = Meteor.methods;

  Meteor.methods = function (dict) {
    var newDict = {};

    _.each(dict, function (func, name) {
      var wrappedFunction = _.wrap(func, function(innerFunc /*, arguments */) {
        // we want the arguments without `innerFunc`
        var args = Array.prototype.slice.call(arguments, 1);

        conf.log.initiating.call(conf.log.context, "Calling '" + name + "', arguments:", args);

        var result = innerFunc.apply(this, args);
        if (typeof result !== 'undefined') {
          conf.log.result.call(conf.log.context, "Result from '" + name + "':", result);
        }

        conf.log.ending.call(conf.log.context, "Ending '" + name + "' call");
        return result;
      });

      newDict[name] = wrappedFunction;
    });

    originalMethods(newDict);
  };
};

if (Meteor.isClient) {
  if (!BlackBox.client.silent) {
    replaceMethods(BlackBox.client);
  }
}

if (Meteor.isServer) {
  if (!BlackBox.server.silent) {
    replaceMethods(BlackBox.server);
  }
}
