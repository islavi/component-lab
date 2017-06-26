import { ComponentLabConfig } from './config';

const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

export interface DevServerConfig {
  port?: number;
  proxy?: any;
  host?: string;
  quiet?: boolean;
  noInfo?: boolean;
  watchOptions?: any;
  https?: boolean | {key: any; cert: any; };
}

export function buildServer(config: ComponentLabConfig, suite: string) {
  const webpackConfig: any = config.webpackConfig;
  const includes = config.include || [];

  webpackConfig.plugins = webpackConfig.plugins.filter(p => ! (p instanceof HtmlWebpackPlugin));

  const compiler = webpack(webpackConfig);

  compiler.apply(new ProgressPlugin({
    profile: true,
    colors: true
  }));

  compiler.apply(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../index.html')
  }));

}
