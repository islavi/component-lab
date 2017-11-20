import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';

@Component({
  selector: 'component-renderer',
  template: `<div class="case" #caseContainer></div>
  <details *ngIf="source">
    <summary style="margin: 1em auto">Source</summary>
    <pre>{{source}}</pre>
  </details>`
})
export class RendererComponent implements OnDestroy {
  private _ref: ComponentRef<any>;
  public source: string;
  private _caseId: string;

  @ViewChild('caseContainer', { read: ViewContainerRef }) public caseContainer: ViewContainerRef;

  constructor(
    private experimentFactory: ExperimentFactoryService,
    private experimentRegistry: ExperimentRegistryService,
    private injector: Injector,
  ) { }

  private _cleanup() {
    if (this._ref) {
      this._ref.destroy();
      this._ref = null;
    }
  }

  @Input() set caseId(caseId: string) {
    this._cleanup();
    this._caseId = caseId;
  }

  ngOnInit() {
    const { factory, injector } = this.experimentFactory.compileComponent(this._caseId, this.injector);
    this._ref = this.caseContainer.createComponent(factory, 0, injector, []);
    const experimentCase = this.experimentRegistry.getExperimentCase(this._caseId);
    this.source = experimentCase.showSource ? experimentCase.template : '';
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
