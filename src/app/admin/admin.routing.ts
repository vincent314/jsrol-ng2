import {RouterModule, Route} from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list.component';

const routes: Route[] = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'tracks',
            component: AdminTrackListComponent
        }]
    }
];
export const routing = RouterModule.forChild(routes);