import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng2-component-lab',
  encapsulation: ViewEncapsulation.None,
  template: `
    <router-outlet></router-outlet>
  `
})
export class ComponentLabComponent { }
