import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';
import { ExperimentGroup } from '../models/experiment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'group-renderer',
  template: `
  <div class="component" *ngFor="let case of group.cases">
    <component-renderer [caseId]="case.id"></component-renderer>
  </div>
  `,
  styles: [`
    :host {

    }
    .component {
      padding-bottom: 100px;
    }
    `]
})
export class RendererGroup implements OnDestroy {
  private _ref: ComponentRef<any>;
  private groupID$: string;
  private group:ExperimentGroup;
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
      this.groupID$ = params['groupID'];
      this.group = this.experimentRegistry.getExperimentGroup(this.groupID$);
    });
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
