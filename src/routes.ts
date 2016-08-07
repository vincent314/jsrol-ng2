/// <reference path="../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';
import {EventBrowserComponent} from './app/event-browser/event-browser.component';
import {AdminComponent} from './app/components/admin/admin.component';

@Component({
    selector: 'root',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class Root {
}

export const routes: RouterConfig = [
    {path: '', pathMatch: 'full', redirectTo: 'display'},
    {path: 'display', component: EventBrowserComponent},
    {path: 'display/:eventId', component: EventBrowserComponent},
    {path: 'admin', component: AdminComponent}
];
