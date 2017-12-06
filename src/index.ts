// vendors
import 'core-js';
import 'zone.js';
import 'reflect-metadata';

import { Experiment, ExperimentCase, ExperimentGroup } from './frontend/models/experiment';
import { Lab } from './frontend/models/lab';
import { bootstrap } from './frontend/bootstrap';

export function createLab(lab: Lab) {
  bootstrap(lab);
}

export class ExperimentBuilder implements Experiment {
  id: string;
  groups: ExperimentGroup[] = [];
  private _callCount = 0;

  constructor(public name: string, public order?: number, public module?: NodeModule) {
    this.id = (module) ? module.id : name;
    this.order = order ? order : 999;
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

}

export function experimentOn(component: string, order?: number, module?: NodeModule): ExperimentBuilder {
  return new ExperimentBuilder(component, order, module);
}
