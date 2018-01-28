import { Component } from '@angular/core';


@Component({
  selector: 'cl-toolbar',
  template: `
    <div class="component-lab-button-group">
      <button class="component-lab-button">
        <i class="material-icons md-18">desktop_windows</i>
      </button>
      <button class="component-lab-button">
        <i class="material-icons md-18">tablet_android</i>
      </button>
      <button class="component-lab-button">
        <i class="material-icons md-18">phone_iphone</i>
      </button>
    </div>

    <!--
    <i class="material-icons">brightness_1</i>
    <i class="material-icons">brightness_5</i>
    -->
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 40px;
      padding: 4px;
      background-color: #F4F7FA;
    }

    .component-lab-button-group {
      width: 100%;
      display: flex;
      flex-direction: row;

    }

    .component-lab-button {
      display: block;
      width: 32px;
      height: 32px;
      margin: 0 4px;
      background-color: transparent;
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
      opacity: 0.1;
      transition: opacity 250ms;
      cursor: pointer;
    }

    .component-lab-button.selected,
    .component-lab-button:hover {
      opacity: 0.5;
    }
  `]
})
export class ToolbarComponent {

}
