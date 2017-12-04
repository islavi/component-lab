import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';
var Prism = require('prismjs');

@Component({
  selector: 'component-renderer',
  template: `
  <h2 class="title">{{title}}</h2>
  <div class="description">{{description}}</div>
  <div class="case" #caseContainer></div>
  <h3 class="source">Source code</h3>
  <pre *ngIf="source"><code class="language-javascript" [innerHTML]="highlighted"></code></pre>
  `,
  styles: [`
    :host {
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
      font-size: 13px;
    }
    h2.title {
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
      font-size: 24px;
      font-weight: regular;
    }
    .description {
      display: flex;
      border-top: 1px solid #d2d2d2;
      padding: 10px 0;
      font-size: 13px;
      font-weight: regular;
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
    }
    h3.source {
      margin: 10px 0;
      font-size: 13px;
      font-weight: regular;
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
    }
    code { display: block; }
    pre {
      background-color: #f2f2f2;
      padding: 5px;
    }
    `
  ]
})
export class RendererComponent implements OnDestroy, OnInit {
  private _ref: ComponentRef<any>;
  private title: string;
  private description: string;
  private source: string;
  private _caseId: string;
  private highlighted: string;

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

  private getHighlightedCode(code: string):string {
    return Prism.highlight(code, Prism.languages.javascript);
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
    this.highlighted = this.getHighlightedCode(this.source);
    this.title = experimentCase.title ? experimentCase.title : '';
    this.description = experimentCase.description ? experimentCase.description : '';
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
