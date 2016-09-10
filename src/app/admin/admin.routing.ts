import {RouterModule, Route} from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list.component';
import {AdminAddTrackComponent} from './admin-add-track.component';
import {AdminEventListComponent} from './admin-event-list.component';

const routes: Route[] = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tracks',
        component: AdminTrackListComponent
      },
      {
        path: 'addTrack',
        component: AdminAddTrackComponent
      },
      {
        path: 'events',
        component: AdminEventListComponent
      }]
  }
];
export const routing = RouterModule.forChild(routes);
