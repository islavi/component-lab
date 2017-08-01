import { ComponentLabConfig } from './config';
import * as _ from "lodash";

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

export function buildServer(config: ComponentLabConfig, suite: string) {
  var webpackConfig: any = {};

  const includes = config.include || [];

  webpackConfig.entry = {
    main: [
      ...includes,
      config.suites[suite]
    ]
  };

  webpackConfig.output = {
    path: path.resolve('.dist'),
    publicPath: '',
    filename: "[name].ng2-component-lab.bundle.js"
  };

  // Merge both webpackConfig
  _.merge(webpackConfig, config.webpackConfig);
  //console.log("merged: " + JSON.stringify(webpackConfig));

  // Set the plugins
  webpackConfig.plugins = webpackConfig.plugins.filter(p => !(p instanceof HtmlWebpackPlugin));

  // Continue to compile
  const compiler = webpack(webpackConfig);

  compiler.apply(new ProgressPlugin({
    profile: true,
    colors: true
  }));

  compiler.apply(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html')
  }));

  compiler.apply(new ProgressPlugin((percentage, msg) => {
    console.log((percentage * 100) + '%', msg);
  }));

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);
      resolve(stats)
    })
  });
}
