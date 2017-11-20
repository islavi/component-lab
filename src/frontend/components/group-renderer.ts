import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';
import { ExperimentGroup } from '../models/experiment';

@Component({
  selector: 'group-renderer',
  template: `
  <div *ngFor="let case of group.cases">
    <component-renderer [caseId]="case.id"></component-renderer>
  </div>
  `
})
export class RendererGroup implements OnDestroy {
  private _ref: ComponentRef<any>;
  private _groupId: string;
  private group:ExperimentGroup;

  constructor(
    private experimentRegistry: ExperimentRegistryService
  ) { }

  private _cleanup() {
    if (this._ref) {
      this._ref.destroy();
      this._ref = null;
    }
  }

  @Input() set groupId(groupId: string) {
    this._cleanup();
    this._groupId = groupId;
  }

  ngOnInit() {
    this.group = this.experimentRegistry.getExperimentGroup(this._groupId);
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
