import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'Main',
    directives: [ROUTER_DIRECTIVES],
    template: ` <div class="main-container">
        <a [routerLink]="['/display']">Display</a>
        <a [routerLink]="['/map']">Map</a>
        <a [routerLink]="['/admin']">Admin</a>
        <router-outlet></router-outlet>
    </div> `
})
export class MainComponent {
}
