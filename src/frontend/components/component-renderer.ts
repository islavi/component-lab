import { ExperimentRegistryService } from './../services/experiment-registry';
import { Component, ComponentRef, Injector, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ExperimentFactoryService } from '../services/experiment-factory';
var Prism = require('prismjs');

@Component({
  selector: 'component-renderer',
  template: `
  <h2 class="component-lab-title">{{title}}</h2>

  <h3 class="component-lab-example">Example</h3>
  <div class="component-lab-case" #caseContainer></div>

  <h3 *ngIf="description" class="component-lab-description-header">Description</h3>
  <div *ngIf="description" class="component-lab-description" [innerHTML]="description"></div>

  <h3 *ngIf="context" class="component-lab-context">Context</h3>
  <pre class="component-lab-pre" *ngIf="context"><code class="component-lab-code language-javascript" [innerHTML]="highlightedContext"></code></pre>

  <h3 *ngIf="source" class="component-lab-source">Source code</h3>
  <pre class="component-lab-pre" *ngIf="source"><code class="component-lab-code language-javascript" [innerHTML]="highlightedSource"></code></pre>
  `,
  styles: [`
    :host {
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
      font-size: 13px;
    }

    .component-lab-title {
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
      font-size: 24px;
      font-weight: regular;
      border-bottom: 1px solid #d2d2d2;
    }

    .component-lab-description {
      display: flex;
      padding: 10px 0;
      font-size: 13px;
      font-weight: regular;
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
    }

    .component-lab-example,
    .component-lab-description-header,
    .component-lab-source,
    .component-lab-context {
      margin: 10px 0;
      font-size: 13px;
      font-weight: regular;
      font-family: OpenSans-Light, 'Open Sans', Arial, sans-serif;
      user-select: text;
    }

    .component-lab-code {
      display: block;
      user-select: text;
    }

    .component-lab-pre {
      background-color: #f2f2f2;
      padding: 5px;
      user-select: text;
    }

    .component-lab-case {
      margin-bottom: 20px;
    }
    `
  ]
})
export class RendererComponent implements OnDestroy, OnInit {
  private _ref: ComponentRef<any>;
  private title: string;
  private description: string;
  private context: string;
  private source: string;
  private _caseId: string;
  private highlightedSource: string;
  private highlightedContext: string;

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
    this.highlightedSource = this.getHighlightedCode(this.source);
    this.title = experimentCase.title ? experimentCase.title : '';
    this.description = experimentCase.description ? experimentCase.description : '';
    this.context = experimentCase.context ? JSON.stringify(experimentCase.context, undefined, 4) : undefined;
    this.highlightedContext = this.context ? this.getHighlightedCode(this.context) : '';
  }

  ngOnDestroy() {
    this._cleanup();
  }

}
