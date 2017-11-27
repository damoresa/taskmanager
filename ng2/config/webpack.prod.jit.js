'use strict';

const path = require('path');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  devtool: 'source-map',
  entry: require('./webpack.entry'),
  output: require('./webpack.output'),
  resolve: require('./webpack.resolve'),
  module: {
    rules: require('./webpack.rules').concat([
      // -------------------------------------------------------------------
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      }])
  },
  plugins: require('./webpack.plugins').concat([

    // fix the warning in ./~/@angular/core/src/linker/system_js_ng_module_factory_loader.js
    new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.join(__dirname, '..', 'src')
    ),

    // fix @angular/core.es5.js warning
    new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.join(__dirname, '..', 'src')
    ),

    //
    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug


      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    })]),
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
