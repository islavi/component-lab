#!/usr/bin/env node
import * as chalk from 'chalk';
import { startServer } from './server';
import { buildServer } from './build';
const Liftoff = require('liftoff');
const minimist = require('minimist');
const interpret = require('interpret');

const args = minimist(process.argv.slice(2));

const ComponentLab = new Liftoff({
  name: 'run-lab',
  extensions: interpret.jsVariants,
  configName: 'ng2-component-lab.config',
  configFiles: {
    'ng2-component-lab.config': {
      up: {
        path: '.',
        findUp: true
      }
    }
  }
});

const log = (message: string) => console.log(message);

ComponentLab.on('require', name => {
  log(`Requiring external module ${chalk.magenta(name)}`);
});

ComponentLab.on('requireFail', name => {
  log(`${chalk.red('Failed to require external module')} ${chalk.magenta(name)}`);
});


ComponentLab.launch({
  cwd: args.cwd,
  require: args.require,
  configPath: args.config,
  completion: args.completion
}, invoke);

function invoke(env: any) {
  const suite = args['_'][0];

  if (!suite) {
    log(chalk.red('No suite provided'));
    process.exit(1);
  }

  if (!env.configPath) {
    log(chalk.red('No local ng2-component-lab config file found'));
    process.exit(1);
  }

  const config = require(env.configPath);

  if (process.argv.indexOf('--build')!=-1){
    log("Going to build project ...");
    buildServer(config, suite);
  } else {
    log("Starting web server ...");
    startServer(config, suite);
  }
}
