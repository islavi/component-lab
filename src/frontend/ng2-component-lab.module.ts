import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routing } from './routing';
import { ComponentLabComponent } from './containers/app';
import { RootContainerComponent } from './containers/root';
import { ExperimentPreviewComponent } from './containers/experiment-preview.component';
import { GroupPreviewComponent } from './containers/group-preview.component';
import { RendererComponent } from './components/component-renderer';
import { GroupRendererComponent } from './components/group-renderer.component';
import { NavComponent } from './components/nav';
import { LayoutComponent } from './components/layout';
import { StageComponent } from './components/stage';
import { ToolbarComponent } from './components/toolbar';
import { ExperimentFactoryService } from './services/experiment-factory';
import { ExperimentRegistryService } from './services/experiment-registry';
import { OrderByPipe } from './pipes/orderby';


@NgModule({
  imports: [
    CommonModule,
    Routing
  ],
  providers: [
    ExperimentFactoryService,
    ExperimentRegistryService,
  ],
  declarations: [
    ComponentLabComponent,
    RendererComponent,
    GroupRendererComponent,
    RootContainerComponent,
    NavComponent,
    GroupPreviewComponent,
    ExperimentPreviewComponent,
    LayoutComponent,
    StageComponent,
    ToolbarComponent,
    OrderByPipe
  ],
  entryComponents: [
    RootContainerComponent,
    GroupPreviewComponent,
    ExperimentPreviewComponent
  ],
  bootstrap: [
    ComponentLabComponent,
  ]
})
export class ComponentLabModule { }
