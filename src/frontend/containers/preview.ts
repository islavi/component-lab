import { pluck } from 'rxjs/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperimentGroup } from '../models/experiment';
import { ExperimentRegistryService } from "../services/experiment-registry";

@Component({
  selector: 'cl-preview-container',
  template: `
    <cl-stage [title]="group.id">
      <group-renderer [groupId]="group.id"></group-renderer>
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
export class PreviewContainerComponent implements OnInit, OnDestroy {
  groupID$: string;
  group: ExperimentGroup;
  private sub: any;

  constructor(private route: ActivatedRoute, private experimentRegistry:ExperimentRegistryService) {
    //this.groupID$ = pluck.call(route.data, 'groupID');
    //console.log("this.groupID$: " + JSON.stringify(this.groupID$));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.groupID$ = params['groupID'];
      console.log("this.groupID$: " + JSON.stringify(this.groupID$));
      this.group = this.experimentRegistry.getExperimentGroup(this.groupID$);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
