# Component Lab 
A component development and testing tool built for Angular 2, inspired by [React Storybook](https://getstorybook.io/)

This is a fork from <a href='https://github.com/synapse-wireless-labs/component-lab'>https://github.com/synapse-wireless-labs/component-lab</a> with some bug fixes and with angular 2 instead of angular 4.

### Getting Started

#### Installation and Configuration
1. Install NG2 Component Lab:
  Via npm:
  ```bash
  npm install ng2-component-lab --save-dev
  ```

  Via yarn:
  ```bash
  yarn add ng2-component-lab --dev
  ```

2. Create a `ng2-component-lab.config.js` file in the root of your project

  ```js
  /**
   * Export a single configuration object
   */
  module.exports = {
    /**
     * Webpack configuration object used to load your experiments
     */
    webpackConfig: { ... },
    /**
     *  Host and port of the Ng2 Component Lab webpack development server
     */
    host: 'localhost',
    port: 6007,
    /**
     * Additional list of files to include in the bundle
     */
    include: [],
    /**
     * Dictionary of suites. Each suite should be a lab configuration 
     * module (see "Writing Experiments") 
     */
    suites: {
      ui: './src/ui/lab.ts',
      devices: './src/devices/lab.ts'
    }
  };
  ```


#### Writing Experiments

1. Create a `component-name.exp.ts` file in the directory your component is located.

  ```ts
  import { experimentOn } from 'ng2-component-lab';


  export default experimentOn('Component Experiment Name')
    .case('Experiment 1 Name', {
      template: `
        <my-component>
          Foo
        </my-component>
      `
    })
    .case('Experiment 2 Name', {
      template: `
        <my-component>
          Bar
        </my-component>
      `
    });
  ```

  Experiments can also provide both a template context object and an array of styles.
  Some cases can be ignored by using `xcase` instead of `case`

  Example:

  ```ts
  import { experimentOn } from 'ng2-component-lab';
  

  export default experimentOn('My Button')
    .case('Normal Button', {
      template: `
        <my-button></my-button>
      `
    })
    .case('Warning Button', {
      context: {
        buttonLabel: 'Warning!',
      },
      styles: [`
        :host {
          text-align: center;
        }
      `],
      template: `
        <my-button [type]="warning">
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

  

#### Running Component Lab
  1. Create a lab configuration module:

  ```ts
  import { createLab } from 'ng2-component-lab';
  import { FeatureModule } from './feature.module';


  createLab({
    /**
     * NgModule to import. All components and pipes must be exported
     * by this module to be useable in your experiments
     */
    ngModule: FeatureModule,
    /**
     * Function that returns an array of experiments.
     *
     * Here is an example using webpack's `require.context` to
     * load all modules ending in `.exp.ts` and returning thier
     * default exports as an array:
     */
    loadExperiments() {
      const context = (require as any).context('./', true, /\.exp\.ts/);

      return context.keys().map(context).map(mod => mod.default);
    }
  });
  ```

  2. List the lab as a suite in your `ng2-component-lab.config.js` file:

  ```js
  module.exports = {
    webpackConfig: { ... },
    host: 'localhost',
    port: 6007,
    include: [],
    suites: {
      feature: './src/feature/feature.module.ts'
    }
  };
  ```

  3. In the `scripts` section of your package.json add a script to start Component Lab:
  ```json
  {
    "scripts": {
      "ng2-component-lab": "ng2-component-lab"
    }
  }
  ```

  4. Start the Component Lab server using npm or yarn providing the suite name:

  Via npm:
  ```bash
  npm run ng2-component-lab -- feature
  ```

  Via yarn:
  ```bash
  yarn run ng2-component-lab -- feature
  ```
  
  
  
#### Bulding ng2-component-lab from src

1. Install all dependencies:

  Via npm:
  ```bash
  npm install
  ```

  Via yarn:
  ```bash
  yarn install
  ```
  
2. Build ng2-component-lab:  
  Via npm:
  ```bash
  npm run build
  ```

  Via yarn:
  ```bash
  yarn run build
  ```

  This will create a folder called "release", this is the folder that we need to refer to in our package.json file.
  So in another project that use the ng2-component-lab we add to his package.json in devDependencies section the path to release.
  For example: 
  ```bash
  "devDependencies": {
    ...
	"ng2-component-lab": "file:///C:\\islavi\\ng2-component-lab\\release",
	...
  }
  ```