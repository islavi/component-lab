import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';
import { ExperimentGroup } from '../models/experiment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cl-preview-container',
  template: `
    <cl-stage>
      <group-renderer *ngFor="let group of groups" [groupId]="group.id"></group-renderer>
    </cl-stage>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class ExperimentPreviewComponent implements OnInit, OnDestroy {

  private _ref: ComponentRef<any>;
  private experimentID: string;
  private groups: Array<ExperimentGroup>;
  private sub: any;

  constructor(private route: ActivatedRoute, private experimentRegistry: ExperimentRegistryService) {

  }

  private _cleanup() {
    if (this._ref) {
      this._ref.destroy();
      this._ref = null;
    }
  }

  ngOnInit():void {
    this.sub = this.route.params.subscribe(params => {
      this.experimentID = params['experimentID'];
      this.groups = this.experimentRegistry.getExperiment(this.experimentID).groups;
    });
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
