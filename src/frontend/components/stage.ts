import { Component } from '@angular/core';


@Component({
  selector: 'cl-stage',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
      padding: 15px;
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(236, 236, 236);
      border-radius: 4px;
    }
  `]
})
export class StageComponent { }
