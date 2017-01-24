import {RouterModule, Route} from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list/admin-track-list.component';
import {AdminEditTrackComponent} from './admin-edit-track/admin-edit-track.component';
import {AdminEventListComponent} from './admin-event-list/admin-event-list.component';
import {AdminEditEventComponent} from './admin-edit-event/admin-edit-event.component';
import {AdminLoopPopinComponent} from './admin-loop-dialog/admin-loop-dialog.component';

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
        component: AdminEditTrackComponent
      },
      {
        path: 'tracks/edit/:trackId',
        component: AdminEditTrackComponent
      },
      {
        path: 'events',
        component: AdminEventListComponent
      },
      {
        path: 'events/edit/:eventId',
        component: AdminEditEventComponent,
        children: [
          {
            path: 'loop',
            component: AdminLoopPopinComponent
          }
        ]
      },
      {
        path: 'events/edit',
        component: AdminEditEventComponent,
      }
    ]
  }
];
export const routing = RouterModule.forChild(routes);
