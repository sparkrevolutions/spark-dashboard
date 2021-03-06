/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    contentSecurityPolicy: {
      'default-src': "'self' http://0.0.0.0:4200",
      'connect-src': "'self' http://192.168.1.21:4200 http://192.168.1.21:35729 ws://192.168.1.21:35729 ws://192.168.1.21:35729  http://192.168.1.21:5984",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' http://192.168.1.21:35729 ",
      'font-src': "'self'",
      'img-src': "'self' 'sparkrevolutions.com' ",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': ""
    },
    modulePrefix: 'spark-dashboard',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
