import {Component, Input} from '@angular/core';


@Component({
  selector: 'cl-stage',
  template: `
    <div class="case">
      <span class="case-title"> {{title}} </span>
     <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: white;
      height: 100%;
      box-sizing: border-box;
      padding: 20px 20px 0px 30px;
    }
    
    .case {
      border-bottom: 1px solid #d2d2d2;
      padding-bottom: 20px;
    }
    
    .case-title {
      font-size: 22px;
      font-family: cursive;
      padding-bottom: 15px;
      display: inline-block;
    }
  `]
})
export class StageComponent {

  @Input() title:string;
}
