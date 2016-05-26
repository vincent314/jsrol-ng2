/// <reference path="../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';
import {DisplayComponent} from './app/components/display/display.component';
import {MapComponent} from './app/components/map/map.component';
import {AdminComponent} from './app/components/admin/admin.component';

@Component({
    selector: 'root',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
export class Root {
}

export const routes:RouterConfig = [
    {path: '', pathMatch: 'full', redirectTo: 'display'},
    {path: 'display', component: DisplayComponent},
    {path: 'map/:id', component: MapComponent},
    {path: 'admin', component: AdminComponent}
];
