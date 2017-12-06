import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExperimentRegistryService } from '../services/experiment-registry';

@Component({
  selector: 'cl-root-container',
  template: `
    <cl-layout>
      <cl-nav [experiments]="experiments"></cl-nav>

      <div #content class="content">
        <router-outlet></router-outlet>
      </div>
    </cl-layout>
  `,
  styles: [`
    .content {
      flex: 5;
      padding: 15px;
      overflow: auto;
    }
  `]
})
export class RootContainerComponent implements OnInit {

  @ViewChild('content') contentElement:ElementRef;

  experiments: any[];
  viewHeight: number;

  constructor(registry: ExperimentRegistryService) {
    this.experiments = registry.getAllExperiments();
  }

  ngOnInit():void {
    this.viewHeight = this.contentElement.nativeElement.offsetHeight;
    this.contentElement.nativeElement.style.height = this.viewHeight + "px";
  }

}
