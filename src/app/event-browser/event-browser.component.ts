import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {TrackListComponent} from '../components/trackList/trackList.component';
import {EventListComponent} from './event-list.component';
import {JsrolService} from '../services/jsrol.service';
import {MapComponent} from '../map/map.component';
import {MDL} from '../directives/MdlUpgrade.directive';
import {ActivatedRoute, Params, ROUTER_DIRECTIVES, Router} from '@angular/router';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
require('material-design-lite/material.js');
import EventModel = jsrol.EventModel;

@Component({
    directives: [TrackListComponent, EventListComponent, MapComponent, MDL, ROUTER_DIRECTIVES],
    providers: [JsrolService],
    template: `<!-- Always shows a header, even in smaller screens. -->
    <div mdl #mdlLayout class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- MDL Spinner Component -->
          <div class="mdl-spinner mdl-js-spinner" [class.is-active]="!currentEvent"></div>
          <!-- Title -->
          <span class="mdl-layout-title">{{(currentEvent)?.name}}</span>
          <span>{{(currentEvent)?.dateTime | date:'dd/MM/yyyy'}}</span>
            <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation">
            <a disabled="true" [hidden]="(loops)?.length > 0">Aucun parcours disponible</a>
            <a *ngFor="let loop of loops; let i = index" class="mdl-navigation__link"
             [class.mdl-navigation__link--current]="loop == currentTrackId"
            [routerLink]="['track', loop]">Boucle {{i + 1}}</a>
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
export class EventBrowserComponent implements OnInit {
    @ViewChild('mdlLayout') mdlLayout: ElementRef;
    currentEvent: EventModel;
    loops: string[];
    currentTrackId: string;

    constructor(private route: ActivatedRoute, private jsRolService: JsrolService, private router: Router) {

    }

    ngOnInit() {
        console.log('EVENT BROWSER ON INIT');
        this.loadCurrentEvent();
        this.loadCurrentTrack();
    }

    private loadCurrentEvent() {
        const subscription = this.route.params
            .flatMap((params: Params): Observable<EventModel> => {
                const eventId: string = params['eventId'];
                this.currentTrackId = params['trackId'];
                console.log(`eventId=${eventId} / trackId=${this.currentTrackId}`);

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
            })
            .subscribe((event: EventModel) => {
                this.currentEvent = event;
                this.loops = this.mapLoops(event);
            });
    }

    private mapLoops(event: EventModel): string[] {
        const loops: string[] = [];

        if (!event) {
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
    }

    private loadCurrentTrack() {
        // this.currentTrack$ = this.route.params.
    }

    onEventClick() {
        this.mdlLayout.nativeElement.MaterialLayout.toggleDrawer();
    }
}
