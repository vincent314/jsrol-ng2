import { EventBrowserComponent } from './event-browser.component';
import { Route, RouterModule } from '@angular/router';
import { TrackResolver } from './track.resolver';
import { EventResolver } from './event.resolver';
import { EventBrowserGuard } from './event-browser.guard';
const routes: Route[] = [
  {
    path: '',
    component: EventBrowserComponent,
    canActivate: [EventBrowserGuard],
    resolve: {event: EventResolver, track: TrackResolver}
  }
];

export const routing = RouterModule.forChild(routes);
