// vendors
import 'core-js';
import 'zone.js';
import 'reflect-metadata';

import { Experiment, ExperimentCase, ExperimentGroup } from './frontend/models/experiment';
import { Lab } from './frontend/models/lab';
import { bootstrap } from './frontend/bootstrap';

export interface CaseConfig {
  context?: any;
  template: string;
  showSource?: boolean;
  styles?: string[];
}

export function createLab(lab: Lab) {
  bootstrap(lab);
}

export class ExperimentBuilder implements Experiment {
  id: string;
  groups: ExperimentGroup[] = [];
  private _callCount = 0;

  constructor(public name: string, public module?: NodeModule) {
    this.id = `exp${module ? module.id : '-' + name}`;
  }

  group(id: string, cases: Array<ExperimentCase>): this {
    this.groups.push(
      new GroupBuilder(id, cases)
    );
    return this;
  }

}

export class GroupBuilder implements ExperimentGroup {
  cases: ExperimentCase[] = [];
  private _callCount = 0;

  constructor(public id: string, cases: Array<ExperimentCase>) {
    this.id = id;
    this.cases = cases;
  }

  // case(description: string, config: CaseConfig): this {
  //   this.cases.push({
  //     id: `${this.id}-${++this._callCount}`,
  //     description,
  //     template: config.template,
  //     context: config.context,
  //     showSource: config.showSource,
  //     styles: config.styles
  //   });

  //   return this;
  // }

  // xcase(description: string, config: CaseConfig): this {
  //   return this;
  // }

}

export function experimentOn(component: string, module?: NodeModule): ExperimentBuilder {
  return new ExperimentBuilder(component, module);
}
