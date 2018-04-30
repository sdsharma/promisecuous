import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CuousComponent } from './cuous/cuous.component';
import { PromiseComponent } from './promise/promise.component';

export const AdminRoutes: Route[] = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'cuous',
        component: CuousComponent
      },
      {
        path: 'promise',
        component: PromiseComponent
      },
      {
        path: '',
        redirectTo: 'promise'
      }
    ]
  }
];
