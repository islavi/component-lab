import { Component } from '@angular/core';
import { ExperimentRegistryService } from '../services/experiment-registry';

@Component({
  selector: 'cl-root-container',
  template: `
    <cl-layout>
      <cl-nav [experiments]="experiments"></cl-nav>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </cl-layout>
  `,
  styles: [`
    .content {
      flex: 5;
    }
  `]
})
export class RootContainerComponent {
  experiments: any[];

  constructor(registry: ExperimentRegistryService) {
    this.experiments = registry.getAllExperiments();
  }
}