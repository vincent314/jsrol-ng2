import {EventBrowserComponent} from './event-browser.component';
import {Route, RouterModule} from '@angular/router';
const routes: Route[] = [
    {path: '', component: EventBrowserComponent}
];

export const routing = RouterModule.forChild(routes);