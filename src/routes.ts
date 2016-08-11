/// <reference path="../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';
import {EventBrowserComponent} from './app/event-browser/event-browser.component';
import {AdminComponent} from './app/components/admin/admin.component';
import {EventTrackComponent} from './app/event-browser/event-track.component';

@Component({
    selector: 'root',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class Root {
}

export const routes: RouterConfig = [
    {path: '', pathMatch: 'full', redirectTo: 'event-browser'},
    {
        path: 'event-browser',
        children: [
            {
                path: '',
                component: EventBrowserComponent
            },
            {
                path: ':eventId',
                component: EventBrowserComponent,
                children: [
                    {
                        path: '',
                        component: EventTrackComponent
                    },
                    {
                        path: 'track/:trackId',
                        component: EventTrackComponent
                    }
                ]
            },
        ]
    },
    {path: 'admin', component: AdminComponent}
];
