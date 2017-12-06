import { Component, OnInit, Input } from '@angular/core';
import { Experiment, ExperimentCase } from '../models/experiment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cl-nav',
  template: `
    <div class="logo">
      <a href="https://github.com/islavi/ng2-component-lab" target="_blank"><h3>NG2 COMPONENT LAB</h3></a>
      <button>⌘</button>
    </div>

    <div class="filter">
      <input type="text" placeholder="Filter" name="filter-text" value="" />
    </div>

    <nav>
      <div *ngFor="let experiment of experiments | orderBy: ['order','name']" class="experiment">
        <h2 class="experimentName">{{ experiment.name }}</h2>

        <nav class="groups">
          <a
            *ngFor="let g of experiment.groups"
            [routerLink]="[ '/', 'experiment', 'preview', experiment.id, g.id ]"
            routerLinkActive="caseLinkActive"
            class="groupLink">&raquo;&nbsp;{{ g.id }}</a>
        </nav>

      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      width: 220px;
      max-height: 100vh;
      overflow: auto;
      box-sizing: border-box;
      padding: 10px 0px 10px 10px;
      font-family: Arial;
      flex: 1;
      font-size: 13px;
    }

    .logo {
      background: rgb(247, 247, 247);
      margin-bottom: 10px;
      display: flex;
    }

    .logo a {
        text-decoration: none;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgb(193, 193, 193);
        border-radius: 2px;
    }

    .logo h3 {
        color: rgb(130, 130, 130);
        -webkit-font-smoothing: antialiased;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-size: 12px;
        font-weight: bolder;
        text-align: center;
        cursor: pointer;
        padding: 5px;
        margin: 0px;
        overflow: hidden;
    }

    .logo button {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bolder;
      color: rgb(130, 130, 130);
      border: 1px solid rgb(193, 193, 193);
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
      padding: 0px;
      margin: 0px 0px 0px 5px;
      background-color: inherit;
      outline: 0px;
      width: 30px;
      flex-shrink: 0;
    }

    .filter {
      color: rgb(68, 68, 68);
      -webkit-font-smoothing: antialiased;
      border: 1px solid rgb(236, 236, 236);
      border-radius: 2px;
      position: relative;
      margin-bottom: 10px;
    }

    .filter input {
      font-size: 12px;
      color: rgb(130, 130, 130);
      padding: 5px; display:
      block; width: 100%;
      box-sizing: border-box;
      outline: none;
      border: 0px;
      height: 26px;
    }

    .groups a.groupLink {
      font-size: 13px;
      display: block;
      padding: 4px 0;
      text-decoration: none;
      text-indent: 10px;
    }

    .experiment:not(:last-child) {

    }

    .experimentName {
      display: block;
      font-size: 15px;
      font-weight: bold;
      padding: 4px 10px;
    }

    .groups {
      padding: 0;
    }

    .caseLink {
      font-size: 11px;
      color: #333;
      display: block;
      text-decoration: none;
      margin: 10px 0px;
      padding: 8px;
      margin: 4px 0px;
      transition: all 200ms;
    }

    .groups a.groupLink.caseLinkActive {
      color: #333;
      background-color: #ffffff;
    }
  `]
})
export class NavComponent implements OnInit {
  @Input() experiments: Experiment[];
  @Input() activeCase: ExperimentCase;

  constructor (private router: Router, private route: ActivatedRoute,) {

  }

  ngOnInit():void {
    // Find experiment with order = 1 and open it as default.
    let firstExperiment = this.experiments.find((experiment:Experiment)=>{
      return experiment.order===1;
    });
    this.router.navigate(['/experiment', 'preview', firstExperiment.id, firstExperiment.groups[0].id]);
  }

}
