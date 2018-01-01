import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootContainerComponent } from './containers/root';
import { GroupPreviewComponent } from './containers/group-preview.component';
import { ExperimentPreviewComponent } from './containers/experiment-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/experiment',
    pathMatch: 'full'
  },
  {
    path: 'experiment',
    component: RootContainerComponent,
    children: [
      {
        path: 'preview/:experimentID/:groupID',
        component: GroupPreviewComponent
      },
      {
        path: 'preview/:experimentID',
        component: ExperimentPreviewComponent
      }
    ],
  },
];


export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
