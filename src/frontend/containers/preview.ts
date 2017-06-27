import {Observable} from 'rxjs/Observable';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExperimentRegistryService} from "../services/experiment-registry";
import {Experiment} from "../models/experiment";


@Component({
  selector: 'cl-preview-container',
  template: `
    <cl-stage [title]="case.description" *ngFor="let case of experiment.cases">
      <cl-renderer [id]="case.id"></cl-renderer>
    </cl-stage>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  `]
})
export class PreviewContainerComponent {
  experiment:Experiment;
  caseID$:Observable<string>;

  constructor(route:ActivatedRoute, private experimentRegistry:ExperimentRegistryService) {
    var experimentID;
    route.params.subscribe((params) => {
        experimentID = params['experimentID'];
      }
    )
    this.experiment = experimentRegistry.getExperiment(experimentID);
  }
}
