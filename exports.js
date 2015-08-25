// export original methods in order to provide a 'silent' alternative
SilentMethods = Meteor.methods;

// setup config vars
BlackBox = BlackBox || {
  // global config for client + server
  global: {
    log: {
      initiating: console.info,
      result: console.log,
      ending: console.info,
      context: console
    }
  }
};

if (Meteor.isClient) {
  BlackBox.client = BlackBox.global;
}

if (Meteor.isServer) {
  BlackBox.server = BlackBox.global;
}
