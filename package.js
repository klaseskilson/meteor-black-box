Package.describe({
  name: 'klaseskilson:black-box',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Log every Meteor.call',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('underscore');
  api.export('BlackBox');
  api.export('SilentMethods');
  api.addFiles('exports.js');
  api.addFiles('black-box.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('klaseskilson:black-box');
  api.addFiles('black-box-tests.js');
});
