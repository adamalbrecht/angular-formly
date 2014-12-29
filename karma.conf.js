'use strict';

module.exports = function(config) {
  config.set({
    autoWatch: true,
    colors: true,
    frameworks: ['mocha', 'chai'],
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    files: [
      'bower_components/angular/angular.js',
      'src/modules/*.js',
      'src/**/*.js'
    ]
  });
};
