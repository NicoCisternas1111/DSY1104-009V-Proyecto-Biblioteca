module.exports = function (config) {
  config.set({
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-spec-reporter'
    ],

    frameworks: ['jasmine'],

    files: [
      { pattern: 'spec/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.js', watched: false, included: false }
    ],

    preprocessors: {
      'spec/**/*.spec.js': ['webpack'],
      'src/**/*.js': ['webpack']
    },

    webpack: require('./webpack.karma'),

    reporters: ['spec', 'coverage-istanbul'],

    specReporter: {
    suppressErrorSummary: false,
    suppressFailed: false,
    suppressPassed: true,
    suppressSkipped: true,
    showSpecTiming: true,
    failFast: false
  },

    coverageIstanbulReporter: {
      dir: 'coverage/',
      reports: ['html', 'text-summary'],
      fixWebpackSourcePaths: true
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_WARN,
    browserNoActivityTimeout: 100000
  });
};