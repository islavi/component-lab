# Ng2 Component Lab 
A component development and testing tool built for Angular 2, inspired by [React Storybook](https://getstorybook.io/)
This is a fork from <a href='https://github.com/synapse-wireless-labs/component-lab'>component-lab</a> with some bug fixes and with angular 2 instead of angular 4.

### Getting Started

#### Installation and Configuration
1. Install NG2 Component Lab:
  Via npm:
  ```bash
  npm install @islavi/ng2-component-lab --save-dev
  ```

2. The best way to understand how to configure ng2-component-lab is to download the example from <a href="https://github.com/islavi/ng2-component-lab-example">https://github.com/islavi/ng2-component-lab-example</a>
  The following files should be configured:

  `ng2-lab-webpack.config.js` file in the root of your project
  This is webpack configuration file for ng2-component-lab
  Below is example file:

  ```js
  var webpack = require('webpack');
  var path = require('path');

  var webpackConfig = {

    devtool: 'source-map',

    plugins: [],

    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'node_modules')]
    },

    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader'
          ]
        },
        { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
        { test: /\.html$/, loader: 'raw-loader' }
      ]
    },

    node: {
      global: true,
      crypto: 'empty',
      __dirname: true,
      __filename: true,
      process: true,
      Buffer: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  module.exports = webpackConfig;
  ```
3. Create folder `.lab` in the root of your application, and create two files inside of it:
  First file: `ng2-component-lab.config.js` - configuration file of ng2-component-lab.
  Example:

  ```js
  var getWebPackConfig = require('./../ng2-lab-webpack.config');

  module.exports = {
    webpackConfig: getWebPackConfig,
    host: 'localhost',
    port: 6007,
    include: [],
    suites: {
      feature: './.lab/ng2-lab-configuration.module.ts'
    }
  }; 
  ```
  Second file: `ng2-lab-configuration.module.ts` - configuration module for ng2-component-lab.
  Example:

  ```js
  import { createLab } from '@islavi/ng2-component-lab';
  import { ComponentsModule } from './../components/components.module';

  createLab({
    /**
    * NgModule to import. All components and pipes must be exported
    * by this module to be useable in your experiments
    */
    ngModule: ComponentsModule,
    /**
    * Function that returns an array of experiments.
    *
    * Here is an example using webpack's `require.context` to
    * load all modules ending in `.exp.ts` and returning thier
    * default exports as an array:
    */
    loadExperiments() {
      const context = (require as any).context('./../experiments/', true, /\.exp\.ts/);
      var result = context.keys().map(context).map(mod => mod.default);
      return result;
    }
  });
  ```

#### Writing Experiments

1. Create folder called `experiments` in the root folder.

2. Create a `component-name.exp.ts` file in `experiments` folder (example: `button.component.exp.ts`).
  Experiments can also provide both a template context object and an array of styles.
  Some cases can be ignored by using `xcase` instead of `case`.
  Example:

  ```ts
  import { experimentOn } from '@islavi/ng2-component-lab';
  import { ButtonComponent } from "./../components/button.component";

  export default experimentOn('Button')
    .case('Primary Button', {
      styles: [`
        my-button /deep/ .my-button {
          border: solid 1px darkblue;
          color: white;
          border-radius: 4px;
          padding: 2px 10px;
          cursor: pointer;
        }
        my-button /deep/ .my-button-primary {
          background-color: blue;
        }
      `],
      template: `
        <my-button>Button</my-button>
      `
    })
    .case('Warning Button', {
      context: {
        buttonLabel: 'Warning!',
      },
      styles: [`
        my-button /deep/ .my-button {
          border: solid 1px darkblue;
          color: white;
          border-radius: 4px;
          padding: 2px 10px;
          cursor: pointer;
        }
        my-button /deep/ .my-button-warning {
          border: solid 1px darkred;
          background-color: red;
        }
      `],
      template: `
        <my-button [type]="'warning'">
          {{ buttonLabel }}
        </my-button>
      `
    })
    .xcase('Not Yet Implemented', {
      template: `
        <my-button raised>Raised Button</my-button>
      `
    })
  ``` 

#### Running Ng2 Component Lab
  1. In the `scripts` section of your package.json add a script to start Component Lab:
  ```json
  {
    "scripts": {
      "lab": "ng2-component-lab --config .lab/ng2-component-lab.config.js -- feature"
    }
  }
  ```
  Note: feature is the suite name.

  2. Start the Component Lab server using npm:

  Via npm:
  ```bash
  npm run lab
  ```
   
  
#### Bulding ng2-component-lab from src

1. Install all dependencies:

  Via npm:
  ```bash
  npm install
  ```
  
2. Build ng2-component-lab:  
  Via npm:
  ```bash
  npm run build
  ```

  This will create a folder called "release".