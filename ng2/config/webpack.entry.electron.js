'use strict';

module.exports = {
    // Entry points for the application
    'polyfills': './src/polyfills.electron.ts',
    'vendor': './src/vendor.ts',
    'twbs': 'bootstrap-loader/extractStyles',
    'app': './src/main.ts'
};
