import { NgModule, Component, Type, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flatten } from 'lodash';
import { Experiment, ExperimentCase, ExperimentGroup } from './models/experiment';
import { ResolvedLab } from './models/lab';

export function getModuleForExperiments(
  inputModule: ModuleWithProviders | Type<any>,
  experiments: Experiment[]
): ResolvedLab {

  const groups = flatten(experiments.map(experiment => experiment.groups.map(g => {
    return {
      id: g.id,
      cases: generateCases(g)
    }
  })));

  const casesWithId:any = groups.map(g => {
    return g.cases.componentsWithIds.map(
      e => {
        return e.component
      }
    );
  });

  const ngModule = generateNgModule(inputModule, casesWithId)

  return { ngModule, groups };
}

export function generateCases(experimentGroup: ExperimentGroup): any {

  const componentsWithIds = flatten(experimentGroup.cases.map(c => {
    return {
      id: c.id,
      component: generateComponent(c)
    }
  }));

  const components = componentsWithIds.reduce((all, next) => {
    return Object.assign(all, { [next.id]: next.component });
  }, {});

  return { components, componentsWithIds };

}

export function generateComponent(experimentCase: ExperimentCase): Type<any> {
  @Component({
    template: experimentCase.template,
    styles: experimentCase.styles
  })
  class ExperimentCaseComponent {
    constructor() {
      Object.assign(this, experimentCase.context || {});
    }
  }

  return ExperimentCaseComponent;
}

export function generateNgModule(inputModule: ModuleWithProviders | Type<any>, components: Type<any>[]): Type<any> {
  @NgModule({
    imports: [
      inputModule
    ],
    declarations: [
      components
    ],
    entryComponents: [
      components
    ]
  })
  class ExperimentModule { }

  return ExperimentModule;
}
