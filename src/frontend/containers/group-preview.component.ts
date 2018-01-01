import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';
import { ExperimentGroup } from '../models/experiment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cl-preview-container',
  template: `
    <cl-stage>
      <group-renderer [groupId]="groupID"></group-renderer>
    </cl-stage>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class GroupPreviewComponent {

  private _ref: ComponentRef<any>;
  private groupID: string;
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
      this.groupID = params['groupID'];
    });
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
