import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { Experiment, ExperimentCase, ExperimentGroup } from '../models/experiment';

export const EXPERIMENTS = new OpaqueToken('Experiments');

export type IdMap<T extends { id: string }> = { [id: string]: T }


@Injectable()
export class ExperimentRegistryService {
  experiments: IdMap<Experiment> = {};
  experimentCases: IdMap<ExperimentCase> = {};
  experimentGroups: IdMap<ExperimentGroup> = {};

  constructor(@Inject(EXPERIMENTS) experiments: Experiment[]) {
    this.experiments = experiments.reduce<IdMap<Experiment>>(byId, {});
    this.experimentGroups = experiments.reduce<IdMap<ExperimentGroup>>((all, next) => {
      return Object.assign(all, next.groups.reduce<IdMap<ExperimentGroup>>(byId, {}));
    }, {});

    // Calculate experiment cases, and build Object: this.experimentCases
    var b:ExperimentCase[]=[];
    for (var property in this.experimentGroups) {
        if (this.experimentGroups.hasOwnProperty(property)) {
            b = b.concat(this.experimentGroups[property].cases);
        }
    }
    this.experimentCases = b.reduce<IdMap<ExperimentCase>>(byId, {});

  }

  getExperiment(id: string): Experiment {
    return this.experiments[id];
  }

  getExperimentCase(id: string): ExperimentCase {
    return this.experimentCases[id];
  }

  getExperimentGroup(groupId: string): ExperimentGroup {
    return this.experimentGroups[groupId];
  }

  getAllExperiments() {
    return Object.keys(this.experiments)
      .map(key => this.experiments[key]);
  }
}

function byId<T extends { id: string }>(entities: IdMap<T> = {}, next: T): IdMap<T> {
  return Object.assign(entities, {
    [next.id]: next
  });
}


export function provideExperiments(experiments: Experiment[]) {
  return { provide: EXPERIMENTS, useValue: experiments };
}
