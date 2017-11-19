import { pluck } from 'rxjs/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperimentGroup } from '../models/experiment';

    // <cl-stage>
    //   <cl-renderer [id]="caseID$ | async"></cl-renderer>
    // </cl-stage>
    // <cl-stage [title]="case.description" *ngFor="let case of experiment.cases">
    //   <cl-renderer [id]="case.id"></cl-renderer>
    // </cl-stage>

@Component({
  selector: 'cl-preview-container',
  template: `
    <cl-stage>
      <cl-renderer [id]="groupID$ | async"></cl-renderer>
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
  groupID$: Observable<string>;
  group: ExperimentGroup;

  constructor(route: ActivatedRoute) {
    this.groupID$ = pluck.call(route.data, 'groupID');
    console.log("this.groupID$: " + JSON.stringify(this.groupID$));
    //this.group =
  }

}
