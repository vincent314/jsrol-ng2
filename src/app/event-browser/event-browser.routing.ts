import { EventBrowserComponent } from './event-browser.component';
import { Route, RouterModule } from '@angular/router';
import { EventBrowserGuard } from './event-browser.guard';
const routes: Route[] = [
  {
    path: '',
    component: EventBrowserComponent,
    canActivate: [EventBrowserGuard]
  }
];

export const routing = RouterModule.forChild(routes);
