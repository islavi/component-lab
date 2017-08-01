import { ComponentLabConfig } from './config';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

export function buildServer(config: ComponentLabConfig, suite: string, output: string) {
  const webpackConfig: any = config.webpackConfig;

  const includes = config.include || [];

  webpackConfig.entry = {
    main: [
      ...includes,
      config.suites[suite]
    ]
  };

  webpackConfig.output = {
    path: path.resolve(output),
    filename: "[name].ng2-component-lab.bundle.js"
  };

  webpackConfig.plugins = webpackConfig.plugins.filter(p => !(p instanceof HtmlWebpackPlugin));

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
  }))

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);
      resolve(stats)
    })
  });
}
