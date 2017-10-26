# ⚠️ THIS PACKAGE IS NO LONGER MAINTAINED


# [klaseskilson:black-box](https://atmospherejs.com/klaseskilson/black-box)

✈️ The **Meteor** equivalent of a flight recorder.

### Why?

Logging your method calls can be useful both when something goes wrong or to
simply monitor your app's activity. Together with for example
[Winston](https://atmospherejs.com/?q=winston), your logs will become a powerful
tool.

## Installation

Install it from Atmosphere:

```bash
meteor add klaseskilson:black-box
```

## Usage

Using BlackBox is dead simple. Simply install it, and you're good to go. Every
method call will be logged both on the server and on the client.

### Example

Add your methods as usual:

```javascript
// lib/methods/some_collection_methods.js
Meteor.methods({
  subtract: function(a, b) {
    return a - b;
  },

  something: function() {
    console.log('Updating something...');
    SomeCollection.update({}, {
        $set: {
          whatever: 'nothing'
        }
      });
    // no return value!
  }
});
```

Then call you methods (again, as usual):

```javascript
// wherever/whatever.js

Meteor.call('subtract', 1, 3, function(error, result) {
  // result = -2
});

Meteor.call('something');
```

BlackBox has now put something in our log:

```
(i) Calling 'subtract', arguments: [1, 3]
    Result from 'subtract': -2
(i) Ending 'subtract' call
(i) Calling 'something', arguments: []
    Updating something...                     <----- log from function!
(i) Ending 'something' call
```

### Config

Logging can be configured for both server and client, separately or both at the
same time (by using the `global` param). The default config params are:

```javascript
BlackBox = {
  global: {
    // before method call
    initiating: console.info,
    // result from method call
    result: console.log,
    // after method call
    ending: console.info,
    silent: undefined
  },
  client: /*copy of global*/,
  server: /*copy of global*/
};
```

By modifying the global `BlackBox` object, you can configure BlackBox' behavior
to fit your needs.

Due to Meteor's [file load order](http://docs.meteor.com/#/full/fileloadorder),
it is recommended to place your configuration in a `lib` folder. Also, make sure
that the BlackBox configuration happens *before* any method declaration.

#### Logging methods

In order to support your favorite log tool, the logging methods may be replaced.
For example, to change the result log on the client, you can simply pass along
any logging function. Like so:

```javascript
// client/lib/black_box.js
BlackBox.client.result = Log.debug;
```

Or, to change the logging methods on both server and client at the same time,
simply modify the `BlackBox.global` object in a shared server/client environment
such as `/lib`. Like so:

```javascript
// lib/black_box.js
BlackBox.global.initiating = MyFavouriteLoggingFunction;
```

#### Preventing logging

Logging can be prevented on `client/server/global` level by setting the
`silent` option to `true`. Like so:

```javascript
// lib/black_box.js
BlackBox.global.silent = true;
```
```javascript
// lib/server/black_box.js
BlackBox.server.silent = true;
```

In order to prevent logging on a output-specific level, use something like
[Underscore's `_.identity`](http://underscorejs.org/#identity). Like so:

```javascript
// lib/black_box.js
// no result log, please
BlackBox.global.result = _.identity;
```

### Silent methods

This package wraps the default `Meteor.methods`. In order to make it possible to
create silent methods, it also exposes `SilentMethods`. `SilentMethods` can be
used just like `Meteor.methods`:

```javascript
SilentMethods({
  add: function(a, b) {
    return a + b;
  }
});
```

And called, just as expected;

```javascript
Meteor.call("add", 1, 2, function(error, result) {
  // result = 3
});
```

without any logging.

## License

MIT.
