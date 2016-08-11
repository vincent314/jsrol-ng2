import {Component, ViewChild, ElementRef} from '@angular/core';
import {TrackListComponent} from '../components/trackList/trackList.component';
import {EventListComponent} from './event-list.component';
import {JsrolService} from '../services/jsrol.service';
import {MapComponent} from '../map/map.component';
import {MDL} from '../directives/MdlUpgrade.directive';
import {ActivatedRoute, Params, ROUTER_DIRECTIVES, Router} from '@angular/router';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
require('material-design-lite/material.js');
import EventModel = jsrol.EventModel;

@Component({
    directives: [TrackListComponent, EventListComponent, MapComponent, MDL, ROUTER_DIRECTIVES],
    providers: [JsrolService],
    pipes: [AsyncPipe],
    template: `<!-- Always shows a header, even in smaller screens. -->
    <div mdl #mdlLayout class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">{{(currentEvent$ | async)?.name}}</span>
          <span>{{(currentEvent$ | async)?.dateTime | date:'dd/MM/yyyy'}}</span>
            <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a *ngFor="let loop of (loops$ | async); let i = index" class="mdl-navigation__link" [routerLink]="['track', loop]">Boucle {{i + 1}}</a>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer" #drawer>
        <event-list (click)="onEventClick()"></event-list>
      </div>
      <main class="mdl-layout__content">
        <router-outlet></router-outlet>
      </main>
    </div>`
})
export class EventBrowserComponent {
    @ViewChild('mdlLayout') mdlLayout: ElementRef;
    currentEvent$: Observable<EventModel>;
    loops$: Observable<string[]>;

    constructor(private route: ActivatedRoute, private jsRolService: JsrolService, private router: Router) {

    }

    ngOnInit() {
        this.loadCurrentEvent();
    }

    private loadCurrentEvent() {
        this.currentEvent$ = this.route.params
            .flatMap((params: Params): Observable<EventModel> => {
                const eventId: string = params['eventId'];
                console.log(`eventId=${eventId}`);

                if (!eventId) {
                    return this.jsRolService.getEvents(new Date().getTime(), 1)
                        .map((events: EventModel[]) => {
                            if (!_.isEmpty(events)) {
                                this.router.navigate(['event-browser', events[0].$key]);
                            }
                            return null;
                        });
                } else {
                    return this.jsRolService.getEvent(eventId);
                }
            });

        this.loops$ = this.currentEvent$
            .map<string[]>((event: EventModel) => {
                const loops: string[] = [];

                if(!event){
                    return loops;
                }

                if (event.loop1) {
                    loops.push(event.loop1 as string);
                }
                if (event.loop2) {
                    loops.push(event.loop2 as string);
                }
                if (event.loop3) {
                    loops.push(event.loop3 as string);
                }
                console.log(loops);
                return loops;
            });
    }

    onEventClick() {
        this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
    }
}
